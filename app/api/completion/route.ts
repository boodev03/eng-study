import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from "next/server";
import { generatePrompt } from '@/helpers/generatePrompt';

const model = google('gemini-2.5-pro-exp-03-25');

const difficultyMap = {
    easy: "beginner",
    medium: "intermediate",
    hard: "advanced",
};

export async function POST(req: NextRequest) {
    try {
        const { topic, difficulty, numberOfSentences, type = "fill-in-blank" } = await req.json();

        const topicDescription = topic || "general";
        const mappedDifficulty = difficultyMap[difficulty as keyof typeof difficultyMap];

        const prompt = generatePrompt({
            type: type as "fill-in-blank" | "multiple-choice",
            numberOfSentences,
            topicDescription,
            difficulty: mappedDifficulty as "beginner" | "intermediate" | "advanced",
        });

        const response = streamText({
            model,
            prompt,
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
