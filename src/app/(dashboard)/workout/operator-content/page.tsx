import { getAllOperators } from "@/api/generics/getAllOperators";
import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerOperatorContent } from "@/components/workout/operator-content/ContainerOperatorContent";
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { IWorkoutGlobalPhases } from "@/interfaces/workout/global-content/GlobalContent";

export default async function Page() {
    const workoutGetAllPhases: IWorkoutGlobalPhases[] = await getAllWorkoutPhases()
    const operators: IGetAllOperators[] = await getAllOperators()

    return (
        <PaperBlock>

            <ContainerOperatorContent operators={operators} workoutGetAllPhases={workoutGetAllPhases} />

            <Ancora
                title="Voltar"
                toGo="/workout/members"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )
}