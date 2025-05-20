import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from "next/server";

const model = google('gemini-2.0-flash');

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const body = await request.json();
        const { difficulty = "medium", topic = "", predefinedTopic = "general" } = body;

        // Validate inputs
        if (!["easy", "medium", "hard"].includes(difficulty)) {
            return NextResponse.json(
                { error: "Invalid difficulty level. Must be 'easy', 'medium', or 'hard'." },
                { status: 400 }
            );
        }

        // Only validate predefinedTopic if no custom topic is provided
        if (!topic && !["general", "business", "travel"].includes(predefinedTopic)) {
            return NextResponse.json(
                { error: "Invalid predefined topic. Must be 'general', 'business', or 'travel'." },
                { status: 400 }
            );
        }

        // Construct prompt based on difficulty and topic
        const prompt = generatePrompt(difficulty, topic, predefinedTopic);

        // Generate response using Google AI via AI SDK
        const { text } = await generateText({
            model: model,
            prompt: prompt,
            temperature: 0.7,
        });

        // Parse the AI response to extract the sentence and phonetics
        const parsedResponse = parseAIResponse(text);

        return NextResponse.json(parsedResponse);
    } catch (error) {
        console.error("Error generating sentence:", error);
        return NextResponse.json(
            { error: "Failed to generate sentence. Please try again." },
            { status: 500 }
        );
    }
}

function generatePrompt(difficulty: string, customTopic: string, predefinedTopic: string) {
    // Map difficulty to learning levels
    const difficultyMap = {
        easy: "Beginner",
        medium: "Intermediate",
        hard: "Advanced"
    };

    // Map predefined topic to contextual descriptions
    const topicMap = {
        general: "daily activities",
        business: "workplace scenarios and professional communication",
        travel: "travel, tourism, and cultural experiences"
    };

    // Determine which topic to use
    const topicDescription = customTopic
        ? customTopic
        : topicMap[predefinedTopic as keyof typeof topicMap];

    // Construct the prompt
    return `**Prompt**:  
Create a single English speaking practice sentence based on the following inputs:  

- **Topic**: ${topicDescription}  
- **Difficulty level**: ${difficultyMap[difficulty as keyof typeof difficultyMap]}  

The sentence must be clear, grammatically correct, natural, and suitable for practicing pronunciation and fluency. Follow these guidelines:  

1. **Sentence Requirements**:  
   - **Beginner level**: Use simple vocabulary (e.g., CEFR A1-A2), basic sentence structures (e.g., subject + verb + object), and 5-8 words. Avoid words with complex consonant clusters (e.g., "strengths") or irregular pronunciations.  
   - **Intermediate level**: Use varied vocabulary (e.g., CEFR B1-B2), connectors (e.g., because, although, while), and complex sentence structures (e.g., compound sentences). Sentence length: 8-12 words. Include at least one topic-specific word.  
   - **Advanced level**: Use sophisticated vocabulary (e.g., CEFR C1-C2), idiomatic expressions, or complex structures (e.g., conditional clauses, passive voice, subjunctive mood). Sentence length: 10-15 words. Include at least two topic-specific words or phrases.  
   - Ensure the sentence is contextually relevant to the topic and sounds natural in everyday or topic-specific situations.  

2. **Pronunciation and IPA**:  
   - Provide the International Phonetic Alphabet (IPA) transcription for each word in the sentence, using **American English** pronunciation as the standard.  
   - Use a reliable pronunciation dictionary (e.g., CMU or Merriam-Webster) to ensure accurate IPA.  
   - Format the IPA as a space-separated list of transcriptions for each word (e.g., /ðə kæt ɪz blæk/).  

3. **Output Format**:  
   - Return **only** the following JSON object, with no additional text or explanation:  
     {
       "sentence",
       "phonetics"
     }`
}

function parseAIResponse(text: string) {
    try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const parsed = JSON.parse(jsonStr);

            // Validate that the response has the required fields
            if (!parsed.sentence || !parsed.phonetics) {
                throw new Error("Invalid response format");
            }

            return {
                sentence: parsed.sentence,
                phonetics: parsed.phonetics
            };
        } else {
            // Fallback processing if JSON parsing fails
            // Look for patterns like "sentence:" and "phonetics:"
            const sentenceMatch = text.match(/sentence:?\s*"([^"]+)"/i);
            const phoneticsMatch = text.match(/phonetics:?\s*"([^"]+)"/i) || text.match(/phonetics:?\s*\/([^\/]+)\//i);

            if (sentenceMatch && phoneticsMatch) {
                return {
                    sentence: sentenceMatch[1],
                    phonetics: phoneticsMatch[1].startsWith('/') ? phoneticsMatch[1] : `/${phoneticsMatch[1]}/`
                };
            }

            throw new Error("Could not extract sentence and phonetics from response");
        }
    } catch (error) {
        console.error("Error parsing AI response:", error, "Raw text:", text);

        // Return a fallback response if parsing fails
        return {
            sentence: "The weather is nice today.",
            phonetics: "/ðə ˈwɛðər ɪz naɪs təˈdeɪ/",
            error: "Failed to parse AI response, returning fallback example."
        };
    }
}
