import {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {eventBus, useAfterRender} from "../../../shared/lib";
import {ChatEvents} from "../enum";

type ChatAnswerAreaProps = {
    options: string[],
    sendAnswerHandler: (params: {
        freeAnswer: string,
        options: string[]
    }) => void,
    isTouchDevice: boolean
}

export function useChatAnswer(
    props: ChatAnswerAreaProps
) {
    const [answer, setAnswer] = useState<string>("");
    const [rows, setRows] = useState(1);
    const [options, setOptions] = useState<Record<string, boolean> | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const MAX_ROWS = 6;
    const optionsRef = useRef<HTMLUListElement | null>(null);

    useAfterRender(() => {
        if (optionsRef.current) {
            eventBus.emit(ChatEvents.OPTIONS_RENDERED);
        }
    }, [options]);

    useEffect(() => {
        const optionsTemplate = props.options.reduce((acc, option) => {
            return {
                ...acc,
                [option]: false
            }
        }, {});

        setOptions(optionsTemplate);
    }, [props.options]);

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
        if (!(answer.length
            || (options && Object.values(options)
                .includes(true)))) return;

        const checkedOptions = options ? Object.keys(options).filter(option => {
            return options[option];
        }) : [];

        const params = {
            freeAnswer: answer,
            options: checkedOptions,
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

    const toggleChecked = (item: string) => {
        setOptions(prevState => {
            if (!prevState) return null;
            return {
                ...prevState,
                [item]: !prevState[item]
            }
        });
    }

    return {
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
    }
}