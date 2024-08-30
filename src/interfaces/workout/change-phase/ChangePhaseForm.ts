import { IGetUserName } from "@/interfaces/generics/IGetUserName";
import { z } from "zod";

interface IWorkoutUser {
    Id_Phase: number
    Id_User: number
    Name: string
    Last_Name: string
    Phase: string
}

interface IWorkoutPhase {
    Id_Phase: number
    Phase: string
}

interface IChangePhase {
    user: IWorkoutUser
    phases: IWorkoutPhase[]
    idWorkout: number
    userName: IGetUserName
}

export const changePhaseFormSchema = z.object({
    workoutPhases: z.string().refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    })
})

export type changePhaseFormData = z.infer<typeof changePhaseFormSchema>

export type { IChangePhase }