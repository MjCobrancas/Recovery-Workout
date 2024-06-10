import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases"
import { ContainerGlobalContent } from "@/components/workout/global-content/ContainerGlobalContent"

export default async function WorkoutGlobalContent() {

    const workoutGetAllPhases = await getAllWorkoutPhases()

    return (
        <>
            <ContainerGlobalContent
                WorkoutAllPhases={workoutGetAllPhases}
            />
        </>
    )
}