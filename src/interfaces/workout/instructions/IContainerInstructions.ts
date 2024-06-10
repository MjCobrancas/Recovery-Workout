import { IWorkoutFilesResponse, IWorkoutInitialGlobalFilesResponse } from "./WorkoutFiles";

interface IContainerInstructionsProps {
    workoutFiles: IWorkoutFilesResponse[] | null
    initialGlobalFiles: IWorkoutInitialGlobalFilesResponse[] | null
}

export type { IContainerInstructionsProps }