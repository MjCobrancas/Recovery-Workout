import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { ICreditorAvaliationQuestions } from "../prepare-avaliation/IPrepareAvaliationInitialForm";

interface IPrepareTyperacerInitialFormProps {
    creditors: ICreditorGetAllCreditors[]
    setValueShowTypeInterface: (value: string) => void
    setValueIdCreditor: (value: number) => void
    disableAllButtons: boolean
    setValueCreditorQuotes: (value: ICreditorAvaliationQuestions[]) => void
    setValuePositions: (value: number[]) => void
}

export type { IPrepareTyperacerInitialFormProps }