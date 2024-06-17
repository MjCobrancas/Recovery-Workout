import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetAllAvaliations } from "./IGetAllAvaliations";
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";

interface IContainerAvaliationRealized {
    creditors: ICreditorGetAllCreditors[]
    operators: IGetAllOperators[]
    avaliations: IGetAllAvaliations[]
}

export type { IContainerAvaliationRealized }