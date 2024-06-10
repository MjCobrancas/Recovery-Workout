import { IAvaliationQuestions, ICreditorQuestionsHeader } from "./IAvaliationForm"

interface IAvaliationButtonProps {
    changeTypeFileToAvaliation: (creditorInfo: ICreditorQuestionsHeader[], creditorQuestions: IAvaliationQuestions[]) => void
    changeTypeFile: (type: string) => void
}

export type { IAvaliationButtonProps }