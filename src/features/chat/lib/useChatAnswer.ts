import {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from "react";
import {ChatEvents} from "../enum";
import {AudioRecorderPlugin} from "audio-recorder-plugin";
import {useAfterRender} from "../../../shared/lib/useAfterRender.tsx";
import {eventBus} from "../../../shared/lib/EventBus.ts";

type ChatAnswerAreaProps = {
    options: string[],
    sendAnswerHandler: (params: {
        freeAnswer: string,
        options: string[],
        audio: HTMLAudioElement | null
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
    const [isRecord, setIsRecord] = useState(false);
    const recorder = useRef(new AudioRecorderPlugin());
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

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

    useEffect(() => {
        if (audio) {
            submitHandler();
        }
    }, [audio])

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
                .includes(true))
            || audio
        )) return;

        const checkedOptions = options ? Object.keys(options).filter(option => {
            return options[option];
        }) : [];

        const params = {
            freeAnswer: answer,
            options: checkedOptions,
            audio: audio
        }

        props.sendAnswerHandler(params);
        resetData();
    }

    const resetData = () => {
        setAnswer("");
        setRows(1);
        setAudio(null);
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

    const recordHandler = () => {
        isRecord ? stopRecord() : startRecord();
    }

    const startRecord = async () => {
        try {
            await recorder.current.init();
            await recorder.current.startRecording();
            setIsRecord(true);
        } catch (error) {
            console.error('Error starting the audio recorder:', error);
        }
    }

    const stopRecord = async () => {
        try {
            const audio = await recorder.current.stopRecording();
            setIsRecord(false);
            setAudio(audio);
        } catch (error) {
            console.error('Error stopping the audio recorder:', error);
        }
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
        recordHandler,
        isRecord,
    }
}