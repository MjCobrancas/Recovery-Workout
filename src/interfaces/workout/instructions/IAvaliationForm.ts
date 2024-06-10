import { z } from "zod"

interface IAvaliationFormProps {
    creditor: ICreditorQuestionsHeader[]
    questions: IAvaliationQuestions[]
}

interface IGetAvaliationQuestionsResponse {
    data: {
        creditor: ICreditorQuestionsHeader[]
        questions: IAvaliationQuestions[]
    }
}

interface ICreditorQuestionsHeader {
    Id_User: number
    Id_Creditor: number
    Creditor: string
}

interface IAvaliationQuestions {
    Id_Avaliation_Question: number
    Question: string
}

interface IAvaliationForm {
    answer: string
}

export const AvalationFormSchema = z.object({
    userAnswers: z.array(
        z.object({
            answer: z.string().min(1)
        })
    )
})

export type { IGetAvaliationQuestionsResponse, ICreditorQuestionsHeader, IAvaliationQuestions, IAvaliationFormProps, IAvaliationForm }