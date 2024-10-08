import styles from "../styles/chat.module.css";
import {memo, useCallback} from "react";
import {Chat} from "../types";
import ChatMessageScroll from "./ChatMessageScroll.tsx";
import {RotateIcon} from "../../../shared/ui/icon/RotateIcon.tsx";
import {ClockIcon} from "../../../shared/ui/icon/ClockIcon.tsx";
import {WarningIcon} from "../../../shared/ui/icon/WarningIcon.tsx";
import {UserIcon} from "../../../shared/ui/icon/UserIcon.tsx";

type ChatMessageProps = {
    questions: Chat.QuestionTemplate[],
    questionLoading: boolean,
    activeQuestionId: string | null,
    answerLoading: boolean,
    reloadAnswer: (index: number) => void
}

const ChatMessages = memo(function ChatMessages(props: ChatMessageProps) {
    const question = useCallback((question: string) => {
        return (
            <div className={"flex gap-4 mb-5 items-start"}>
                <div className={"flex items-center justify-center shrink-0 bg-violet-400 w-10 h-10 rounded-full overflow-hidden"}>
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
            ...answer.options,
            ...answer.answer
        ].filter(item => item.length).join(', ');

        return (
            answerText.length || answer.audio ? (
                <div className={`flex justify-end relative mb-5 gap-3`}>
                    {answer.warning ? (
                        <WarningIcon className={"w-5 h-5 fill-red-900 self-center shrink-0"}/>
                    ) : <></>}
                    <div className={`p-3 rounded-2xl bg-white max-w-lg shadow-md ${
                        (isLoading || (answer.warning && isLastAnswer) ) ? "pr-8" : ""}`}>
                        <p className={"break-words"}>{answerText}</p>
                        {answer.audio && <audio src={answer.audio.src} controls/>}
                    </div>
                    <div className={`flex absolute bottom-1 right-1.5 gap-1`}>
                        {isLoading ? (
                            <ClockIcon className={"w-4 h-4 fill-gray-600"}/>
                        ) :<></>}
                        {!isLoading && answer.warning && isLastAnswer ? (
                            <button
                                onClick={() => props.reloadAnswer(answerIndex)}
                                type={"button"}>
                                <RotateIcon className={"w-4 h-4 fill-red-900 hover:fill-gray-400"}/>
                            </button>
                        ) :<></>}
                    </div>
                </div>
            ) : <></>
        )
    }

    return (
        <ChatMessageScroll>
            <ul className={"w-full md:w-7/12 mx-auto px-4 md:px-0 py-5"}>
                {props.questions.map(questionItem => (
                    <li key={questionItem.id}>
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
                    </li>
                ))}
                {props.questionLoading ? (
                    loadingQuestion()
                ) : <></>}
            </ul>
        </ChatMessageScroll>
    )
});

export default ChatMessages;