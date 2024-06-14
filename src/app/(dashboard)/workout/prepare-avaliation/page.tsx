import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerPrepareAvaliation } from "@/components/workout/prepare-avaliation/ContainerPrepareAvaliation";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";

export default async function page() {
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Preparar avaliação do credor" />

            <ContainerPrepareAvaliation creditors={creditors} />

            <Ancora
                title="Voltar"
                toGo="/workout/members"
                styles={`ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )
}