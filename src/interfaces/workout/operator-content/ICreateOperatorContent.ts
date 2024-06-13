import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { IWorkoutGlobalPhases } from "../global-content/GlobalContent"
import { z } from "zod"

interface ICreateOperatorContentProps {
    operators: IGetAllOperators[]
    workoutGetAllPhases: IWorkoutGlobalPhases[]
}

interface ICreateFileOperatorForm {
    title: string
    phases: string
    inputUrl: string
    file: File | null
    idOperator: string
}

export const ICreateFileOperatorSchema = z.object({
    title: z.string().min(1),
    phases: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    idOperator: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { ICreateOperatorContentProps, ICreateFileOperatorForm }