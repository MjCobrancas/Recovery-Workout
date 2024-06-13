import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { IWorkoutGlobalPhases } from "../global-content/GlobalContent"
import { z } from "zod"

interface IEditSearchOperatorContentProps {
    operators: IGetAllOperators[]
    workoutGetAllPhases: IWorkoutGlobalPhases[]
}

interface IOperatorFilesList {
    Id_File_Operator: number
    Id_Operator: number
    Id_Phase: number
    Title: string
    FileExtension: string | null
}

interface IEditOperatorContentProps {
    operators: IOperatorFilesList[]
    workoutGetAllPhases: IWorkoutGlobalPhases[]
    setValueDisableAllButtons: (value: boolean) => void
    disableAllButtons: boolean
    setValueOperatorFiles: (value: IOperatorFilesList[]) => void
}

interface IOperatorFilesForm  {
    Id_File_Operator: string
    Id_Operator: string
    Id_Phase: string
    Title: string
    FileExtension: string | null
    Status: boolean
}

interface IOperatorFilesObject {
    id_user: number
    operatorFiles: {
        id_file_operator: number
        id_phase: number
        title: string
        status: boolean
    }[]
}

export const IOperatorFilesSchema = z.object({
    operatorFiles: z.array(
        z.object({
            FileExtension: z.string().min(1).or(z.null()),
            Id_Operator: z.string().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            Id_File_Operator: z.string().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            Id_Phase: z.string().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            Status: z.boolean(),
            Title: z.string().min(1)
        })
    )
})

export type { IEditSearchOperatorContentProps, IOperatorFilesList, IEditOperatorContentProps, IOperatorFilesForm, IOperatorFilesObject }