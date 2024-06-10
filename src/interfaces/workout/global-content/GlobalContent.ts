import { z } from "zod"

interface IWorkoutGlobalPhases {
    Id_Phase: number
    Phase: string
}

interface IWorkoutGlobalContent {
    WorkoutAllPhases: IWorkoutGlobalPhases[]
}

interface IWorkoutAllGlobalFiles {
    globalFiles: IWorkoutGlobalFile[]
    initialGlobalFiles: IWorkoutGlobalFile[]
}

interface IWorkoutGlobalFile {
    FileExtension: string
    Id_Global_File: number
    Id_Phase: number
    Title: string
}

export const globalContentSchema = z.object({
    workoutPhases: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    }),
    workoutTitle: z.string().min(1),
    workoutURL: z.string().min(1)
})

export type globalContentData = z.infer<typeof globalContentSchema>
export type { IWorkoutGlobalContent, IWorkoutGlobalPhases, IWorkoutAllGlobalFiles }