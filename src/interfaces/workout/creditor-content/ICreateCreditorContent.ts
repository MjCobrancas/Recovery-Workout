import { IWorkoutGlobalPhases } from "../global-content/GlobalContent";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { z } from "zod";

interface ICreateCreditorContentProps {
    WorkoutAllPhases: IWorkoutGlobalPhases[]
    Creditors: ICreditorGetAllCreditors[]
}

interface ICreateFileCreditorForm {
    title: string
    phases: string
    inputUrl: string
    file: File | null
    idCreditor: string
}

export const ICreateFileCreditorSchema = z.object({
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
    idCreditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { ICreateCreditorContentProps, ICreateFileCreditorForm }