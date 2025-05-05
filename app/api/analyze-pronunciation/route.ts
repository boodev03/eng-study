import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Parse multipart form data
        const formData = await request.formData();
        const audioFile = formData.get('audio') as File;
        const sentence = formData.get('sentence') as string;
        const phonetics = formData.get('phonetics') as string;

        if (!audioFile || !sentence) {
            return NextResponse.json(
                { error: "Missing audio file or reference sentence" },
                { status: 400 }
            );
        }

        // Convert audio file to base64 for sending to Gemini
        const audioBytes = await audioFile.arrayBuffer();
        const audioBase64 = Buffer.from(audioBytes).toString("base64");

        // Use Gemini model to analyze pronunciation directly from audio
        const { text } = await generateText({
            model: google('gemini-1.5-flash'),
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `**Prompt**:  
You are an advanced speech recognition and pronunciation analysis system powered by the Gemini model. Your task is to analyze an audio file containing an English sentence spoken by a user and provide a detailed pronunciation analysis in Vietnamese. Follow these steps:  

1. **Input**:  
   - Receive an audio file of the user speaking an English sentence.  
   - The target sentence is: "${sentence}"  
   - The standard phonetic transcription (IPA) for each word in the target sentence is provided: ${phonetics || "Not provided, please generate standard IPA for each word using a pronunciation dictionary (e.g., CMU or Oxford) in American English."}  
   - Ensure the exact IPA transcription from ${phonetics} is used if provided, without standardizing or altering the IPA symbols.  

2. **Audio Processing**:  
   - Transcribe the audio into text, identifying each spoken word in the order it appears.  
   - For each recognized word, generate its IPA transcription based on the user’s pronunciation in the audio.  
   - If a word is mispronounced or unrecognizable, provide the closest possible IPA transcription based on the audio.  
   - If the audio is unclear or corrupted, return an error message: "Audio quality is too low. Please re-record."  
   - If the spoken words do not match the target sentence, still transcribe and generate IPA for the spoken words, and proceed to comparison.  

3. **Pronunciation Comparison**:  
   - Compare the user’s spoken words and their IPA transcriptions with the words and standard IPA transcriptions of the target sentence.  
   - For each word position in the target sentence:  
     - If the user’s spoken word matches the target word (by text and position), compare the user’s IPA with the standard IPA.  
     - If the user’s spoken word does not match the target word (e.g., different word or missing), mark it as incorrect and include the standard IPA of the target word.  
     - Classify the pronunciation as:  
       - **Correct**: If the spoken word matches the target word and the user’s IPA matches or is very close to the standard IPA (allowing minor regional variations, e.g., American vs. British English).  
       - **Incorrect**: If the spoken word does not match the target word, or the IPA deviates significantly, or the word is unrecognizable.  
   - Ensure proper handling of multi-word phrases (e.g., "every day" as two separate words, not "everyday").  
   - If the user speaks fewer or more words than the target sentence, analyze up to the length of the target sentence and mark extra or missing words as incorrect.  

4. **Output**:  
   - Return a JSON object with the following structure, using Vietnamese for feedback and summary:  
     [
       {
         "word": "<spoken word or target word if not spoken>",
         "user_ipa": "<user’s IPA transcription or 'N/A' if word not spoken>",
         "standard_ipa": "<standard IPA transcription from phonetics for the target word>",
         "status": "<correct | incorrect>",
         "feedback": "<brief explanation in Vietnamese, e.g., 'Phát âm chính xác' or 'Nói sai từ, nên là [target word] với IPA [standard_ipa]'>"
       },
       ...
     ]`
                        },
                        {
                            type: 'file',
                            data: audioBase64,
                            mimeType: audioFile.type,
                        },
                    ]
                }
            ]
        });

        // Parse AI response
        try {
            // Attempt to extract JSON from the response
            const jsonMatch = text.match(/\[[\s\S]*\]/);

            if (jsonMatch) {
                const jsonStr = jsonMatch[0];
                const analysisResult = JSON.parse(jsonStr);

                return NextResponse.json(analysisResult);
            } else {
                throw new Error("Could not extract JSON from AI response");
            }
        } catch (error) {
            console.error("Error parsing AI response:", error, "Raw text:", text);

            // Fallback response if parsing fails
            const words = sentence.split(' ');
            return NextResponse.json(
                words.map(word => ({
                    word: word,
                    user_ipa: "/?/",
                    standard_ipa: "/?/",
                    status: "unknown",
                    feedback: "Failed to analyze pronunciation. Please try again."
                }))
            );
        }
    } catch (error) {
        console.error("Error analyzing pronunciation:", error);
        return NextResponse.json(
            { error: "Failed to analyze pronunciation. Please try again." },
            { status: 500 }
        );
    }
}