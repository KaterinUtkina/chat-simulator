import {ChangeEvent, KeyboardEventHandler, useRef, useState} from "react";
import {ChatAnswerAreaProps} from "../ChatAnswerArea.tsx";

export function useChatAnswer(
    props: ChatAnswerAreaProps
) {
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
        if (!answer.length) return;

        const params = {
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

    const settingsTextarea = props.isTouchDevice ? {
        autoFocus: false
    } : {
        autoFocus: true,
        onBlur: handleBlur
    };


    return {
        rows,
        handleChange,
        handleKeyDown,
        submitHandler,
        settingsTextarea,
        textareaRef,
        answer,
    }
}