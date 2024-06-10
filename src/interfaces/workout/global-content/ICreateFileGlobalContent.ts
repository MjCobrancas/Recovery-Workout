import { z } from "zod";
import { IWorkoutGlobalPhases } from "./GlobalContent";

interface ICreateFileGlobalContentProps {
    WorkoutAllPhases: IWorkoutGlobalPhases[]
}

interface ICreateFileGlobalForm {
    title: string
    phases: string
    inputUrl: string
    file: File | null
}

export const ICreateFileGlobalSchema = z.object({
    title: z.string().min(1),
    phases: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    })
})

export type { ICreateFileGlobalContentProps, ICreateFileGlobalForm }