import {useState} from "react";
import {Chat} from "../../../types/chat";

export function useChat() {
    const [isLoading] = useState(false);
    const [questions] = useState<Chat.Question[]>([
        {
            id: "1",
            text: "first",
            answer: [{
                options: [],
                answer: ["answer"],
                warning: false
            }],
        },
    ]);
    const [questionLoading] = useState<boolean>(false);
    const [activeQuestionId] = useState<string | null>("1");
    const [answerLoading] = useState<boolean>(false);

    const reloadAnswer = (index: number) => {
        console.log(index)
    }

    return {
        isLoading,
        questions,
        questionLoading,
        answerLoading,
        activeQuestionId,
        reloadAnswer,
    }
}