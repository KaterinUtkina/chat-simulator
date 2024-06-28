export namespace Chat {
    export type QuestionOptions = {
        id: string,
        text: string
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
}