export namespace Chat {
    export type Question = {
        id: string,
        text: string,
        options: string[]
    }

    export type QuestionTemplate = {
        id: string,
        text: string,
        answer: Answer[],
    }

    export type Answer = {
        options: string[],
        answer: string[],
        warning: boolean
    }

    export type AnswerRequest = {
        questionId: string,
        freeAnswer: string,
        options: string[]
    }
}