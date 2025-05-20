import { renderPrompt } from '@/lib/langchain/prompt';
import { ExplainRequirement } from '@/types/exercise';
import { getPromptByKey } from '@/utils/supabase/services/prompt.service';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";

const model = google('gemini-2.0-flash');

export async function POST(req: NextRequest) {
    try {
        const { topic, difficulty, numberOfSentences, type = "fill_in_blank", question, correctAnswers, userAnswer, explanationLanguage } = await req.json();

        const topicDescription = topic || "general";

        const promptData = await getPromptByKey(type)

        let prompt: any = {
            content: "",
        }

        if (type === "explain") {
            const requireExplain: ExplainRequirement = {
                exerciseType: type,
                difficultyLevel: difficulty,
                explanationLanguage: explanationLanguage,
                question: question,
                correctAnswers: correctAnswers,
                userAnswer: userAnswer,
            }

            prompt = await renderPrompt(promptData.prompt, {
                requireExplain
            });
        } else {
            prompt = await renderPrompt(promptData.prompt, {
                require: {
                    numberOfSentences,
                    topicDescription,
                    difficulty,
                },
            });
        }

        if (!prompt.content) {
            return NextResponse.json(
                { error: "Failed to generate exercises" },
                { status: 500 }
            );
        }

        console.log("PROMPT", prompt.content.toString());

        const response = streamText({
            model,
            prompt: prompt.content.toString(),
            maxTokens: 8000,
            temperature: 0.7,
        });
        return response.toDataStreamResponse();
    } catch (error) {
        console.error("Error generating exercises:", error);
        return NextResponse.json(
            { error: "Failed to generate exercises" },
            { status: 500 }
        );
    }
}
