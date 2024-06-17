import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOperators } from "@/api/generics/getAllOperators";
import { getAllAvaliations } from "@/api/workout/realized/getAllAvaliations";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerAvaliationRealized } from "@/components/workout/realized/ContainerAvaliationRealized";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { IGetAllAvaliations } from "@/interfaces/workout/realized/IGetAllAvaliations";

export default async function Page() {
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const operators: IGetAllOperators[] = await getAllOperators()
    const avaliations: IResultDefaultResponse<IGetAllAvaliations[] | null> = await getAllAvaliations()

    return (
        <PaperBlock>
            <TextPrincipal text="Avaliações Realizadas" />

            <ContainerAvaliationRealized 
                creditors={creditors} 
                operators={operators}
                avaliations={avaliations.data == null ? [] : avaliations.data} 
            />
        </PaperBlock>
    )
}