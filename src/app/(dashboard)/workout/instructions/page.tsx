'use server'

import { getInitialGlobalFile, getInitialGlobalFiles } from "@/api/workout/instructions/getInitialGlobalFiles";
import { getInstructionsFileList } from "@/api/workout/instructions/getInstructionsFileList";
import ContainerInstructions from "@/components/workout/instructions/ContainerInstructions";
import { IResultDefaultResponse, ITokenUserInitialValues } from "@/interfaces/Generics";
import { IWorkoutFilesResponse, IWorkoutInitialGlobalFilesResponse } from "@/interfaces/workout/instructions/WorkoutFiles";
import { GetUserToken } from "@/utils/GetUserToken";

export default async function WorkoutInstructions() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const workoutFiles: IResultDefaultResponse<IWorkoutFilesResponse[] | null> = await getInstructionsFileList(userParse.idUser)
    const initialGlobalFiles: IResultDefaultResponse<IWorkoutInitialGlobalFilesResponse[] | null> = await getInitialGlobalFiles()

    return (
        <ContainerInstructions workoutFiles={workoutFiles.data} initialGlobalFiles={initialGlobalFiles.data} />
    )
}
