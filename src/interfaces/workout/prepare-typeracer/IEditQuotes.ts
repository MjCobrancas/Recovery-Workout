import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors"
import { z } from "zod"

interface IQuotes {
    Id_Phrase: number
    Phrase: string
    Phrase_Reference: string
    Status: boolean
    Position: number
}

interface IEditQuotesProps {
    idCreditor: number
    creditors: ICreditorGetAllCreditors[]
    creditorQuotes: IQuotes[]
    disableAllButtons: boolean
    setValueDisableAllButtons: (value: boolean) => void
}

export const IEditQuotesSchema = z.object({
    creditorQuotesArray: z.array(
        z.object({
            Id_Phrase: z.number().min(1),
            Phrase: z.string().min(1),
            Phrase_Reference: z.string().min(1),
            Status: z.boolean(),
            Position: z.number()
        })
    )
})

export type { IEditQuotesProps, IQuotes }