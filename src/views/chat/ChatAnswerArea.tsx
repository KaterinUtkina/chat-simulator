import {memo} from "react";
import SendIcon from "../components/svg/SendIcon.tsx";
import {useChatAnswer} from "./use/useChatAnswer.ts";

export type ChatAnswerAreaProps = {
    options: string[],
    sendAnswerHandler: (params: {
        freeAnswer: string,
        options: string[]
    }) => void,
    isTouchDevice: boolean
}
const ChatAnswerArea = memo(function ChatAnswerArea(props: ChatAnswerAreaProps) {
    const {
        rows,
        handleChange,
        handleKeyDown,
        submitHandler,
        settingsTextarea,
        textareaRef,
        answer,
        toggleChecked,
        options,
    } = useChatAnswer(props);

    return (
        <div onKeyDown={handleKeyDown} className={"pb-4"}>
            <ul className={"flex gap-4 justify-between mb-4 pt-4"}>
                {options && Object.keys(options).map((optionKey, index) => (
                    <li
                        onClick={() => toggleChecked(optionKey)}
                        key={index}
                        className={`py-2 px-6 bg-violet-200 rounded-lg cursor-pointer box-border grow text-center ${options && options[optionKey] ? "outline outline-2 outline-violet-400" : ""}`}>
                        {optionKey}
                    </li>
                ))}
            </ul>
            <div className={"flex gap-2 relative"}>
                <div className={"grow shadow-md rounded-md p-3 bg-white flex"}>
                    <textarea
                        className={"resize-none focus:outline-none w-full mr-10"}
                        rows={rows}
                        ref={textareaRef}
                        onChange={handleChange}
                        value={answer}
                        placeholder={"Enter answer here..."}
                        {...settingsTextarea}
                    ></textarea>
                </div>
                <button
                    className={"bg-violet-400 p-2.5 rounded-md shrink-0 mt-auto absolute right-2 bottom-1.5"}
                    onClick={submitHandler}>
                    <SendIcon className={"w-4 h-4 fill-white"}/>
                </button>
            </div>
        </div>
    )
});

export default ChatAnswerArea;