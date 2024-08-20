import { IQuotes } from "./ITyperacer";
import { IWorkoutFilesResponse, IWorkoutInitialGlobalFilesResponse } from "./WorkoutFiles";

interface IContainerInstructionsProps {
    workoutFiles: IWorkoutFilesResponse[] | null
    initialGlobalFiles: IWorkoutInitialGlobalFilesResponse[] | null
    quotes: IQuotes[]
}

export type { IContainerInstructionsProps }