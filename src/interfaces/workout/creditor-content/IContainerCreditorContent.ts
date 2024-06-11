import { IWorkoutGlobalPhases } from "../global-content/GlobalContent";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";

interface IContainerCreditorContent {
    workoutGetAllPhases: IWorkoutGlobalPhases[]
    creditors: ICreditorGetAllCreditors[]
}

export type { IContainerCreditorContent }