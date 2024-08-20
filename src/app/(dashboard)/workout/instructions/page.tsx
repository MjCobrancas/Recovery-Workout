'use server'

import { getInitialGlobalFile, getInitialGlobalFiles } from "@/api/workout/instructions/getInitialGlobalFiles";
import { getInstructionsFileList } from "@/api/workout/instructions/getInstructionsFileList";
import { getQuotes } from "@/api/workout/typerace/getQuotes";
import ContainerInstructions from "@/components/workout/instructions/ContainerInstructions";
import { IResultDefaultResponse, ITokenUserInitialValues } from "@/interfaces/Generics";
import { IQuotes } from "@/interfaces/workout/instructions/ITyperacer";
import { IWorkoutFilesResponse, IWorkoutInitialGlobalFilesResponse } from "@/interfaces/workout/instructions/WorkoutFiles";
import { GetUserToken } from "@/utils/GetUserToken";

export default async function WorkoutInstructions() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const workoutFiles: IResultDefaultResponse<IWorkoutFilesResponse[] | null> = await getInstructionsFileList(userParse.idUser)
    const initialGlobalFiles: IResultDefaultResponse<IWorkoutInitialGlobalFilesResponse[] | null> = await getInitialGlobalFiles()
    const quotes: IResultDefaultResponse<IQuotes[]> = await getQuotes()


    return (
        <ContainerInstructions quotes={quotes.data} workoutFiles={workoutFiles.data} initialGlobalFiles={initialGlobalFiles.data} />
    )
}
