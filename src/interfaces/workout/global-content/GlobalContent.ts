import { z } from "zod"

interface IWorkoutGlobalPhases {
    Id_Phase: number
    Phase: string
}

interface IWorkoutGlobalContent {
    WorkoutAllPhases: IWorkoutGlobalPhases[]
}

export const globalContentSchema = z.object({
    workoutPhases: z.enum(["1", "2", "3", "4", "5"]),
    workoutTitle: z.string().min(1),
    workoutURL: z.string().min(1)
})

export type globalContentData = z.infer<typeof globalContentSchema>
export type { IWorkoutGlobalContent, IWorkoutGlobalPhases }