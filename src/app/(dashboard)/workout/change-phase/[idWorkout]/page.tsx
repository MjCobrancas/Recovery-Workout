import { getAllBackOffice } from "@/api/generics/getAllBackOffice"
import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases"
import { getWorkoutUser } from "@/api/workout/change-phase/getWorkoutUser"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { ChangePhaseForm } from "@/components/workout/change-phase/ChangePhaseForm"

export default async function WorkoutChangePhase({ params }: { params: { idWorkout: string } }) {

    const wGetUser = await getWorkoutUser(Number(params.idWorkout))

    const wGetAllBackOffice = await getAllBackOffice()

    const wGetAllPhases = await getAllWorkoutPhases()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal text="Mudar Fase do Operador" styles={`max-md:text-[2rem]`} />

            <ChangePhaseForm
                user={wGetUser}
                phases={wGetAllPhases}
                backOffice={wGetAllBackOffice}
                idWorkout={Number(params.idWorkout)}
            />
        </PaperBlock>
    )
}