import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IWorkoutGlobalPhases } from "../global-content/GlobalContent";
import { z } from "zod";

interface IEditSearchCreditorContentProps {
    Creditors: ICreditorGetAllCreditors[]
    WorkoutGetAllPhases: IWorkoutGlobalPhases[]
}

interface IEditCreditorContentProps {
    Creditors: ICreditorFilesList[]
    WorkoutGetAllPhases: IWorkoutGlobalPhases[]
    setValueDisableAllButtons: (value: boolean) => void
    disableAllButtons: boolean
    setValueCreditorFiles: (value: ICreditorFilesList[]) => void
}

interface ICreditorFilesList {
    Id_File_Creditor: number
    Id_Creditor: number
    Id_Phase: number
    Title: string
    FileExtension: string | null
}

interface ICreditorFilesObject {
    id_creditor: number
    creditorFiles: {
        id_file_creditor: number
        id_phase: number
        title: string
        status: boolean
    }[]
}

interface ICreditorFilesForm  {
    Id_File_Creditor: string
    Id_Creditor: string
    Id_Phase: string
    Title: string
    FileExtension: string | null
    Status: boolean
}

export const ICreditorFilesSchema = z.object({
    creditorFiles: z.array(
        z.object({
            FileExtension: z.string().min(1).or(z.null()),
            Id_Creditor: z.string().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            Id_File_Creditor: z.string().min(1).refine((value) => {
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

export type { IEditSearchCreditorContentProps, ICreditorFilesList, IEditCreditorContentProps, ICreditorFilesForm, ICreditorFilesObject }