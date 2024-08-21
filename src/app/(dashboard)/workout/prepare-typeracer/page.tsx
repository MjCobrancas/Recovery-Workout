import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerPrepareTyperacer } from "@/components/workout/prepare-typeracer/ContainerPrepareTyperacer";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";

export default async function Page() {
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    
    return (
        <PaperBlock>
            <TextPrincipal text="Preparar exercícios de digitação" />

            <ContainerPrepareTyperacer creditors={creditors} />

            <Ancora 
                title="Voltar"
                toGo="/workout/members"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )
}