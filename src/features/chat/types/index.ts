export namespace Chat {
    export type QuestionTemplate = {
        id: string,
        text: string,
        answer: Answer[],
    }

    export type Answer = {
        options: string[],
        answer: string[],
        audio: HTMLAudioElement | null,
        warning: boolean
    }

    export type AnswerRequest = {
        questionId: string,
        freeAnswer: string,
        options: string[],
        audio: HTMLAudioElement | null
    }
}