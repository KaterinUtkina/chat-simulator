import {Chat} from "../../types/chat";
import styles from "../../css/chat.module.css";
import UserIcon from "../components/svg/UserIcon.tsx";
import RotateIcon from "../components/svg/RotateIcon.tsx";
import WarningIcon from "../components/svg/WarningIcon.tsx";
import ScrollChat from "./ScrollChat.tsx";
import ClockIcon from "../components/svg/ClockIcon.tsx";
import {memo, useCallback} from "react";

type ChatMessageProps = {
    questions: Chat.Question[],
    questionLoading: boolean,
    activeQuestionId: string | null,
    answerLoading: boolean,
    reloadAnswer: (index: number) => void
}

const ChatMessages = memo(function ChatMessages(props: ChatMessageProps) {
    const question = useCallback((question: string) => {
        return (
            <div className={"flex gap-4 mb-5 items-start"}>
                <div className={"flex items-center justify-center bg-violet-400 w-10 h-10 rounded-full overflow-hidden"}>
                    <UserIcon className={"w-full h-full pt-1 fill-white"}/>
                </div>
                <div className={"max-w-lg pt-2 pb-2"}>
                    {question}
                </div>
            </div>
        )
    }, []);

    const loadingQuestion = useCallback(() => {
        return (
            <div className={"flex gap-4 mb-5 items-start"}>
                <div className={"flex items-center justify-center bg-violet-400 w-10 h-10 rounded-full overflow-hidden"}>
                    <UserIcon className={"w-full h-full pt-1 fill-white"}/>
                </div>
                <div className={"mt-auto pb-1"}>
                    <div className={"flex gap-2"}>
                        <span className={`${styles.animate} w-1 h-1 bg-violet-400 rounded-full`}></span>
                        <span className={`${styles.animate} w-1 h-1 bg-violet-400 rounded-full`}></span>
                        <span className={`${styles.animate} w-1 h-1 bg-violet-400 rounded-full`}></span>
                    </div>
                </div>
            </div>
        )
    }, []);

    const answer = (
        answer: Chat.Answer,
        questionId: string,
        isLastAnswer: boolean,
        answerIndex: number
    ) => {
        const isLoading = props.activeQuestionId === questionId && isLastAnswer && props.answerLoading;

        const answerText = [
            ...answer.options.map(item => item.text), ...answer.answer
        ].filter(item => item.length).join(', ');

        return (
            answerText.length ? (
                <div className={"flex justify-end relative"}>
                    <div className={`mb-5 p-3 rounded-2xl bg-white max-w-lg shadow-md ${
                        (isLoading) ? "pr-8" : ""} ${(!isLoading && answer.warning) ? "pr-12" : ""}`}>
                        {answerText}
                    </div>
                    <div className={`flex absolute bottom-6 right-1.5 gap-1`}>
                        {isLoading ? (
                            <ClockIcon className={"w-4 h-4 fill-gray-600"}/>
                        ) :<></>}
                        {!isLoading && answer.warning ? (
                            <>
                                <WarningIcon className={"w-4 h-4 fill-red-900"}/>
                                <button
                                    onClick={() => props.reloadAnswer(answerIndex)}
                                    type={"button"}>
                                    <RotateIcon className={"w-4 h-4 fill-gray-600 hover:fill-gray-400"}/>
                                </button>
                            </>
                        ) :<></>}
                    </div>
                </div>
            ) : <></>
        )
    }

    return (
        <ScrollChat>
            <div className={"w-7/12 mx-auto pt-5 pb-5"}>
                {props.questions.map(questionItem => (
                    <div key={questionItem.id}>
                        {question(questionItem.text)}
                        {questionItem.answer.map((answerItem, index) => (
                            <div key={index}>
                                {answer(
                                    answerItem,
                                    questionItem.id,
                                    questionItem.answer.length - 1 === index,
                                    index
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                {props.questionLoading ? (
                    loadingQuestion()
                ) : <></>}
            </div>
        </ScrollChat>
    )
});

export default ChatMessages;