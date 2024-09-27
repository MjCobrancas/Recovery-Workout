import { getUserName } from "@/api/generics/getUserName"
import { getAllWorkoutPhases } from "@/api/workout/change-phase/getAllWorkoutPhases"
import { getWorkoutUser } from "@/api/workout/change-phase/getWorkoutUser"
import { PaperBlock } from "@/components/PaperBlock"
import { TextPrincipal } from "@/components/TextPrincipal"
import { ChangePhaseForm } from "@/components/workout/change-phase/ChangePhaseForm"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { IGetUserName } from "@/interfaces/generics/IGetUserName"

export default async function WorkoutChangePhase({ params }: { params: { idWorkout: string } }) {

    const wGetUser = await getWorkoutUser(Number(params.idWorkout))

    const wGetAllPhases = await getAllWorkoutPhases()

    const userName: IResultDefaultResponse<IGetUserName | null> = await getUserName()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal text="Mudar Fase do Operador" styles={`max-md:text-[2rem]`} />

            <ChangePhaseForm
                user={wGetUser}
                phases={wGetAllPhases}
                idWorkout={Number(params.idWorkout)}
                userName={userName.data!}
            />
        </PaperBlock>
    )
}