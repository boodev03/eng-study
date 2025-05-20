'use server'

import Handlebars from "handlebars";
import { SystemMessage, BaseMessage } from "@langchain/core/messages";

export const renderPrompt = async (
    prompt: string,
    data: any
): Promise<BaseMessage> => {
    try {
        const promptTemplate = Handlebars.compile(prompt);
        return new SystemMessage(promptTemplate(data));
    } catch (error: any) {
        console.error(`Error processing prompt: ${error.message}`);
        throw error;
    }
};