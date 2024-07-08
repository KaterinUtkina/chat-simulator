import {useCallback, useEffect, useState} from "react";
import {Chat} from "../../../types/chat";
import questionsMock from "../../../assets/questions.json";
import {changeWindowHeightHelpers} from "../../../js/helpers/changeWindowHeightHelpers.ts";
import {useLoading} from "./useLoading.ts";

export function useChat() {
    const [questions, setQuestions]
        = useState<Chat.Question[]>([]);
    const [activeQuestionId, setActiveQuestionId]
        = useState<string | null>(null);
    const {loading: answerLoading, startLoading: startAnswerLoading, stopLoading: stopAnswerLoading} = useLoading();
    const {loading: questionLoading, startLoading: startQuestionLoading, stopLoading: stopQuestionLoading} = useLoading();
    const [activeAnswerIndex, setActiveAnswerIndex]
        = useState(0);
    const [optionsQuestion, setOptionsQuestions]
        = useState<Chat.QuestionOptions[]>([]);
    const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
    const { setHeight } = changeWindowHeightHelpers();

    const createOrUpdateAnswers = (
        params: Chat.AnswerRequest,
        index: number
    ) => {

        const newAnswers = {
            options: [],
            answer: [params.freeAnswer],
            warning: false
        };

        return questions.map(item => {
            if (item.id === params.questionId) {
                let answers = [...item.answer];
                answers[index] = newAnswers;

                return {
                    ...item,
                    answer: answers,
                }
            }

            return item;
        });
    }

    const sendAnswerAndGetQuestion = async (
        params: Chat.AnswerRequest,
        questionsList: Chat.Question[],
        answerIndex: number
    ) => {
        try {
            await sendAnswer();

            stopAnswerLoading();
            resetQuestions();

            if (!questionsMock[questionsList.length]) return;

            startQuestionLoading();

            void getQuestionHandler(questionsList);
        } catch (err: any) {
            stopAnswerLoading();

            const warningQuestions = questionsList.map(item => {
                if (item.id === params.questionId) {
                    return {
                        ...item,
                        answer: item.answer.map((itemAnswer, index) => {
                            if (answerIndex === index) {
                                return {
                                    ...itemAnswer,
                                    warning: true
                                }
                            }
                            return itemAnswer
                        })
                    }
                }

                return item;
            });

            setQuestions(warningQuestions);
        }
    }

    const reloadAnswer = useCallback((index: number) => {
        if (answerLoading || questionLoading) {
            return;
        }

        startAnswerLoading();

        const updateAnswer = questions
            .find(item => item.id === activeQuestionId)?.answer[index];

        if (!updateAnswer || !activeQuestionId) return;

        const params = {
            questionId: activeQuestionId,
            freeAnswer: updateAnswer.answer[0],
            options: updateAnswer.options.map(item => item.id)
        }

        const newQuestions = createOrUpdateAnswers(params, index);
        setQuestions(newQuestions);

        void sendAnswerAndGetQuestion(params, newQuestions, index);
    },[
        answerLoading,
        questionLoading,
        questions,
        activeQuestionId,
        startAnswerLoading,
        createOrUpdateAnswers,
        sendAnswerAndGetQuestion
    ]);

    const sendAnswer = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.7) {
                    resolve(true);
                } else {
                    reject();
                }
            }, 500);
        })
    }

    const getQuestionHandler = useCallback((questionsList = questions) => {
        setTimeout(() => {
            setActiveAnswerIndex(0);
            stopQuestionLoading();

            const newQuestions = [
                ...questionsList,
                {
                    id: questionsMock[questionsList.length].id,
                    text: questionsMock[questionsList.length].text,
                    answer: []
                }
            ];

            setQuestions(newQuestions);
            setActiveQuestionId(questionsMock[questionsList.length].id);
        }, 500);
    }, []);

    useEffect(() => {
        void getQuestionHandler();
    }, [getQuestionHandler]);

    const sendAnswerHandler = useCallback(async (params: {
        freeAnswer: string,
        options: string[]
    }) => {
        if (answerLoading || questionLoading || !activeQuestionId) return;

        const answerIndex = activeAnswerIndex;
        setActiveAnswerIndex(index => index + 1);
        startAnswerLoading();

        const newQuestions = createOrUpdateAnswers(
            {...params, questionId: activeQuestionId},
            answerIndex
        );
        setQuestions(newQuestions);

        void sendAnswerAndGetQuestion({...params, questionId: activeQuestionId}, newQuestions, answerIndex);
    }, [
        answerLoading,
        questionLoading,
        activeAnswerIndex,
        startAnswerLoading,
        createOrUpdateAnswers,
        sendAnswerAndGetQuestion
    ]);

    const resetQuestions = () => {
        setOptionsQuestions([]);
    }

    useEffect(() => {
        setHeight();
        initEvents();
        checkTouchDevice();

        return () => {
            removeEvents();
        }

    }, []);

    const initEvents = () => {
        window.addEventListener('resize', setHeight);
    }

    const removeEvents = () => {
        window.removeEventListener('resize', setHeight);
    }

    const checkTouchDevice = () => {
        setIsTouchDevice(navigator.maxTouchPoints > 0);
    }

    return {
        questions,
        questionLoading,
        answerLoading,
        activeQuestionId,
        reloadAnswer,
        activeAnswerIndex,
        sendAnswerHandler,
        optionsQuestion,
        isTouchDevice,
    }
}