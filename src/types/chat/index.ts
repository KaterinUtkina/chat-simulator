export namespace Chat {
    export type QuestionOptions = {
        id: string,
        text: string,
        options: string[]
    }

    export type Question = {
        id: string,
        text: string,
        answer: Answer[],
    }

    export type Answer = {
        options: QuestionOptions[],
        answer: string[],
        warning: boolean
    }

    export type AnswerRequest = {
        questionId: string,
        freeAnswer: string,
        options: string[]
    }
}