import ChatMessageScroll from "./ChatMessageScroll.tsx";
import {Chat} from "../types";
import ChatAnswer from "./ChatAnswer.tsx";
import ChatQuestion from "./ChatQuestion.tsx";
import LoadingQuestion from "./LoadingQuestion.tsx";
import {Fragment} from "react";

type ChatMessageProps = {
  questions: Chat.QuestionTemplate[],
  questionLoading: boolean,
  activeQuestionId: string | null,
  answerLoading: boolean,
  reloadAnswer: (index: number) => void
}

const ChatMessages = (props: ChatMessageProps) => {
    return (
        <ChatMessageScroll>
            <ul className={"w-full md:w-7/12 mx-auto px-4 md:px-0 py-5"}>
                {props.questions.map(questionItem => (
                    <li key={questionItem.id}>
                        <ChatQuestion text={questionItem.text} />
                        {questionItem.answer.map((answerItem, index) => (
                            <Fragment key={index}>
                                <ChatAnswer
                                    answer={answerItem}
                                    questionId={questionItem.id}
                                    isLastAnswer={questionItem.answer.length - 1 === index}
                                    answerIndex={index}
                                    activeQuestionId={props.activeQuestionId}
                                    answerLoading={props.answerLoading}
                                    reloadAnswer={props.reloadAnswer}
                                />
                            </Fragment>
                        ))}
                    </li>
                ))}
                {props.questionLoading && <LoadingQuestion />}
            </ul>
        </ChatMessageScroll>
    )
}

export default ChatMessages;