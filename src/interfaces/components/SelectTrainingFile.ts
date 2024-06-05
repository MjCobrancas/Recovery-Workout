import { z } from "zod"

interface ISelectTrainingFile {
    typeFile: string
    fileUrl: string
    YoutubeExternalVideo: string | null
    CreditorQuestions: any[]
    CreditorInfo: any[]
}

export const SelectTrainingFileSchema = z.object({
    question: z.string().min(1)
})

export type SelectTrainingFileData = z.infer<typeof SelectTrainingFileSchema>

export type { ISelectTrainingFile }