import {memo} from "react";
import {useChatAnswer} from "../lib/useChatAnswer.ts";
import {StopIcon} from "../../../shared/ui/icon/StopIcon.tsx";
import {SendIcon} from "../../../shared/ui/icon/SendIcon.tsx";
import {MicrophoneIcon} from "../../../shared/ui/icon/MicrophoneIcon.tsx";

type ChatAnswerAreaProps = {
    options: string[],
    sendAnswerHandler: (params: {
        freeAnswer: string,
        options: string[],
        audio: HTMLAudioElement | null,
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
        optionsRef,
        recordHandler,
        isRecord,
    } = useChatAnswer(props);

    return (
        <div onKeyDown={handleKeyDown} className={"pb-4"}>
            <ul className={"flex gap-4 justify-between mb-4 flex-wrap"} ref={optionsRef}>
                {options && Object.keys(options).map((optionKey, index) => (
                    <li
                        onClick={() => toggleChecked(optionKey)}
                        key={index}
                        className={`py-2 px-6 bg-violet-200 rounded-lg cursor-pointer box-border grow text-center hover:outline hover:outline-2 hover:outline-violet-400 ${
                            options && options[optionKey]
                                ? "outline outline-2 outline-violet-400" 
                                : ""}`}>
                        {optionKey}
                    </li>
                ))}
            </ul>
            <div className={"flex gap-2 relative"}>
                <label className={"grow shadow-md rounded-md p-3 bg-white flex"}>
                    <textarea
                        className={"resize-none focus:outline-none w-full mr-24"}
                        rows={rows}
                        ref={textareaRef}
                        onChange={handleChange}
                        value={answer}
                        placeholder={"Enter answer here..."}
                        {...settingsTextarea}
                    ></textarea>
                </label>
                <button
                    type={"button"}
                    className={"rounded-md p-1 shrink-0 mt-auto absolute right-14 bottom-1.5"}
                    onClick={recordHandler}
                >
                    {isRecord ? (
                        <StopIcon className={"w-7 h-7 fill-violet-400"}/>
                    ) : (
                        <MicrophoneIcon className={"w-7 h-7 fill-violet-400"}/>
                    )}
                </button>
                <button
                    type={"button"}
                    className={"bg-violet-400 p-2.5 rounded-md shrink-0 mt-auto absolute right-2 bottom-1.5"}
                    onClick={submitHandler}>
                    <SendIcon className={"w-4 h-4 fill-white"}/>
                </button>
            </div>
        </div>
    )
});

export default ChatAnswerArea;