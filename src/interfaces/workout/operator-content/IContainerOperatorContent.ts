import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { IWorkoutGlobalPhases } from "../global-content/GlobalContent"

interface IContainerOperatorContent {
    operators: IGetAllOperators[]
    workoutGetAllPhases: IWorkoutGlobalPhases[]
}

export type { IContainerOperatorContent }