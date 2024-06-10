import { z } from "zod";
import { IWorkoutAllGlobalFiles, IWorkoutGlobalPhases } from "./GlobalContent";

interface IEditGlobalFilesProps {
    globalAllFiles: IWorkoutAllGlobalFiles
    WorkoutAllPhases: IWorkoutGlobalPhases[]
    setGlobalFiles: (globalFiles: IWorkoutAllGlobalFiles) => void
}

interface IObjectBackendRequest {
    initialGlobalFiles: {
        id_global_file: number
        title: string
        status: boolean
    }[]
    globalFiles: {
        id_global_file: number
        id_phase: number
        title: string
        status: boolean
    }[]
}

/*
    const object: IObjectBackendRequest = {
        initialGlobalFiles = [
            {
                id_global_file: 1,
                title: "teste",
                status: true
            }
        ]
    }
*/

interface IEditGlobalFilesForm {
    FileExtension: string | null
    Id_Global_File: string
    Id_Phase: string
    Title: string
    Status: boolean
}

export const IEditGlobalFilesSchema = z.object({
    globalFiles: z.array(
        z.object({
            FileExtension: z.string().or(z.null()),
            Id_Global_File: z.string().min(1),
            Id_Phase: z.string().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }
                if (Number(value) < 0) {
                    return false
                }

                return true
            }),
            Title: z.string().min(1),
            Status: z.boolean()
        })
    )
})

export type { IEditGlobalFilesProps, IEditGlobalFilesForm, IObjectBackendRequest }