import type { CreatedQuizData, ReturnedQuizData } from "../types/types";
import type { AxiosResponse } from "axios";
import API from "./api";

// Endpoint matches: app.use("/api/v1/quiz", ...)
const QUIZ_ENDPOINT = "/api/quiz";

export const createQuiz = async (data: CreatedQuizData): Promise<ReturnedQuizData> => {
    try {
        const { content, ...rest } = data;
        const res: AxiosResponse<{ quiz: ReturnedQuizData; stats: unknown }> =
            await API.post(QUIZ_ENDPOINT, { ...rest, text: content });

        if (!res.data.quiz) {
            throw new Error("Invalid response from server");
        }

        console.log("Backend response:", res.data.quiz);
        return res.data.quiz;
    } catch (err: unknown) {
        let errorMsg = "Unknown error";
        if (typeof err === "object" && err !== null) {
            const e = err as {
                response?: { data?: { message?: string } };
                message?: string;
            };
            if (e.response?.data?.message) errorMsg = e.response.data.message;
            else if (e.message) errorMsg = e.message;
        }

        console.error("Error creating quiz:", errorMsg);
        throw new Error(errorMsg);
    }
};
