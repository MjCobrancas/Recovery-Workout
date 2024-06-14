import { ICreditorAvaliationQuestions } from "./IPrepareAvaliationInitialForm";

interface IAvaliationEditQuestionsFormProps { 
    creditorQuestions: ICreditorAvaliationQuestions[]
    positionsValue: number[]
    disableAllButtons: boolean
    setValueDisableAllButtons: (value: boolean) => void
}

export type { IAvaliationEditQuestionsFormProps }