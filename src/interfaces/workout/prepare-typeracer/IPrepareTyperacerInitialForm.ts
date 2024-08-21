import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IQuotes } from "./IEditQuotes";

interface IPrepareTyperacerInitialFormProps {
    creditors: ICreditorGetAllCreditors[]
    setValueShowTypeInterface: (value: "create-quote" | "edit-quotes" | "") => void
    setValueIdCreditor: (value: number) => void
    disableAllButtons: boolean
    setValueCreditorQuotes: (value: IQuotes[]) => void
}

export type { IPrepareTyperacerInitialFormProps }