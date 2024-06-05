import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases"
import ContainerGlobalContent from "@/components/workout/global-content/ContainerGlobalContent"

export default async function WorkoutGlobalContent() {

    const wGetAllPhases = await getAllWorkoutPhases()

    return (
        <>
            <ContainerGlobalContent
                WorkoutAllPhases={wGetAllPhases}
            />
        </>
    )
}