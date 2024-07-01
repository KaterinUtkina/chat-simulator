import {ChangeEvent, KeyboardEventHandler, memo, useRef, useState} from "react";
import SendIcon from "../components/svg/SendIcon.tsx";
import {Chat} from "../../types/chat";

type ChatAnswerAreaProps = {
    loading: boolean,
    options: Chat.QuestionOptions[],
    sendAnswerHandler: (params: Chat.AnswerRequest) => void,
    questionId: string | null,
}
const ChatAnswerArea = memo(function ChatAnswerArea(props: ChatAnswerAreaProps) {
    const [answer, setAnswer] = useState<string>("");
    const [rows, setRows] = useState(1);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const MAX_ROWS = 6;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(event.target.value);

        const previousRows = event.target.rows;
        event.target.rows = 1;

        const lineHeightPx = parseFloat(getComputedStyle(event.target).lineHeight);
        const currentRows = Math.ceil(event.target.scrollHeight / lineHeightPx);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows > MAX_ROWS) {
            event.target.rows = MAX_ROWS;
        }

        setRows(currentRows < MAX_ROWS ? currentRows : MAX_ROWS);
    };

    const handleBlur = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.selectionStart = answer.length;
        }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Enter' && event.shiftKey) {
            return;
        }

        if (event.key === 'Enter') {
            event.preventDefault();

            submitHandler();
        }
    };

    const submitHandler = () => {
        if (props.loading || !props.questionId || !answer.length) return;

        const params: Chat.AnswerRequest = {
            questionId: props.questionId,
            freeAnswer: answer,
            options: []
        }

        props.sendAnswerHandler(params);
        resetData();
    }

    const resetData = () => {
        setAnswer("");
        setRows(1);
    }

    return (
        <div onKeyDown={handleKeyDown} className={"pb-4"}>
            <div className={"flex gap-2"}>
                <div className={"grow shadow-md rounded-md p-3 bg-white flex"}>
                    <textarea
                        className={"resize-none focus:outline-none w-full"}
                        rows={rows}
                        ref={textareaRef}
                        onChange={handleChange}
                        value={answer}
                        placeholder={"Enter answer here..."}
                        autoFocus={true}
                        onBlur={handleBlur}
                    ></textarea>
                </div>
                <button className={"bg-violet-400 p-2.5 rounded-md shrink-0 mt-auto"} onClick={submitHandler}>
                    <SendIcon className={"w-7 h-7 fill-white"}/>
                </button>
            </div>
        </div>
    )
});

export default ChatAnswerArea;