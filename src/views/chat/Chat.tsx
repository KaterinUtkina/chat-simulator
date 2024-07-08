import ChatMessages from "./ChatMessages.tsx";
import {useChat} from "./use/useChat.ts";
import ChatAnswerArea from "./ChatAnswerArea.tsx";

function Chat() {
    const {
        questions,
        questionLoading,
        answerLoading,
        activeQuestionId,
        reloadAnswer,
        sendAnswerHandler,
        isTouchDevice,
        optionsQuestion,
    } = useChat();

    return (
        <div className={"h-full overflow-hidden"}>
            <div className={"h-full relative"}>
                <header className="bg-white shadow absolute w-full z-10">
                    <div className="px-4 py-6 sm:px-4 lg:px-6">
                        <h1 className="text-2xl tracking-tight text-gray-900">Chat</h1>
                    </div>
                </header>
                <main className={"bg-gray-100 pt-20 h-full"}>
                    <div className="flex flex-col h-full">
                        <div className={"h-max mb-auto overflow-y-auto"}>
                            <ChatMessages
                                questions={questions}
                                activeQuestionId={activeQuestionId}
                                questionLoading={questionLoading}
                                answerLoading={answerLoading}
                                reloadAnswer={reloadAnswer}
                            />
                        </div>
                        <div className={"w-full px-4 md:px-0 md:w-7/12 mx-auto"}>
                            <ChatAnswerArea
                                sendAnswerHandler={sendAnswerHandler}
                                options={optionsQuestion}
                                isTouchDevice={isTouchDevice}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Chat;
