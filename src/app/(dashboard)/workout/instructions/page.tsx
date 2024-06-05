'use server'

import { getInitialGlobalFile, getInitialGlobalFiles } from "@/api/workout/instructions/getInitialGlobalFiles";
import { getInstructionsFileList } from "@/api/workout/instructions/getInstructionsFileList";
import ContainerInstructions from "@/components/workout/instructions/ContainerInstructions";
import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export default async function WorkoutInstructions() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const workoutFiles = await getInstructionsFileList(userParse.idUser)
    const initialGlobalFiles = await getInitialGlobalFiles()

    return (
        <ContainerInstructions workoutFiles={workoutFiles} initialGlobalFiles={initialGlobalFiles} />
    )
}

