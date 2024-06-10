import { z } from "zod"
import { IAvaliationQuestions, ICreditorQuestionsHeader } from "../workout/instructions/IAvaliationForm"

interface ISelectTrainingFile {
    typeFile: string
    fileUrl: string
    YoutubeExternalVideo: string | null
    CreditorQuestions: IAvaliationQuestions[]
    CreditorInfo: ICreditorQuestionsHeader[]
}

export const SelectTrainingFileSchema = z.object({
    question: z.string().min(1)
})

export type SelectTrainingFileData = z.infer<typeof SelectTrainingFileSchema>

export type { ISelectTrainingFile }