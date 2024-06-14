import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { z } from "zod";

interface IPrepareAvaliationInitialFormProps {
    creditors: ICreditorGetAllCreditors[]
    setValueShowTypeInterface: (value: string) => void
    setValueIdCreditor: (value: number) => void
    disableAllButtons: boolean
    setValueCreditorQuestions: (value: ICreditorAvaliationQuestions[]) => void
    setValuePositions: (value: number[]) => void
}

interface IPrepareAvaliationInitialForm {
    idCreditor: string
    selectOption: string
}

export const IPrepareAvaliationInitialFormSchema = z.object({
    idCreditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    selectOption: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) != 1 && Number(value) != 2) {
            return false
        }

        return true
    })
})

interface ICreditorAvaliationQuestionsResponse {
    dataArray: ICreditorAvaliationQuestions[]
    highestPosition: number
    lowestPosition: number
}

interface ICreditorAvaliationQuestions {
    Id_Avaliation_Question: number
    Question: string
    Question_Have_Image: boolean
    Id_Creditor: number
    Position: number
    Status: boolean
}

export const creditorAvaliationQuestionsSchema = z.object({
    creditorAvaliationQuestions: z.array(
        z.object({
            Id_Avaliation_Question: z.number().min(1),
            Question: z.string().min(1),
            Question_Have_Image: z.boolean(),
            Id_Creditor: z.number().min(1),
            Position: z.number().min(0),
            Status: z.boolean()
        })
    )
})

export type { IPrepareAvaliationInitialFormProps, IPrepareAvaliationInitialForm, ICreditorAvaliationQuestionsResponse, ICreditorAvaliationQuestions }