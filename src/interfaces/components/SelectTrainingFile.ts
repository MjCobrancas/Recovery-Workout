import { z } from "zod"
import { IAvaliationQuestions, ICreditorQuestionsHeader } from "../workout/instructions/IAvaliationForm"
import { IQuotes } from "../workout/instructions/ITyperacer"

interface ISelectTrainingFile {
    typeFile: string
    fileUrl: string
    YoutubeExternalVideo: string | null
    CreditorQuestions: IAvaliationQuestions[]
    CreditorInfo: ICreditorQuestionsHeader[]
    quotes: IQuotes[]
}

export const SelectTrainingFileSchema = z.object({
    question: z.string().min(1)
})

export type SelectTrainingFileData = z.infer<typeof SelectTrainingFileSchema>

export type { ISelectTrainingFile }