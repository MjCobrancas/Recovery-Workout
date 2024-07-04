import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { ContainerCreditorContent } from "@/components/workout/creditor-content/ContainerCreditorContent";

export default async function Page() {
    const creditors = await getAllCreditors()
    const workoutGetAllPhases = await getAllWorkoutPhases()

    return (
        <PaperBlock>

            <ContainerCreditorContent creditors={creditors} workoutGetAllPhases={workoutGetAllPhases} />

            <Ancora
                title="Voltar"
                toGo="/workout/members"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )

}