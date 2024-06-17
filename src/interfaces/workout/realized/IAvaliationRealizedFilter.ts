import { ICreditorGetAllCreditors } from "@/interfaces/generics/GetAllCreditors";
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { z } from "zod";
import { IGetAllAvaliations } from "./IGetAllAvaliations";

interface IAvaliationRealizedFilterProps {
    creditors: ICreditorGetAllCreditors[]
    operators: IGetAllOperators[]
    avaliations: IGetAllAvaliations[]
    setValueAvaliationList: (value: IGetAllAvaliations[]) => void
}

interface IAvaliationRealizedFilterForm {
    id_creditor: string
    id_user: string
    select_date: string
    date: string
}

export const IAvaliationRealizedFilterFormSchema = z.object({
    id_creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    }),
    id_user: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) < 0) {
            return false
        }

        return true
    }),
    select_date: z.string(),
    date: z.string().refine((value) => {
        let regex = /^\d{4}-\d{2}-\d{2}$/g

        if (value.length >= 1) {
            if (regex.test(value)) {
                return true
            }
    
            return false
        }

        return true
    })
})

export type { IAvaliationRealizedFilterProps, IAvaliationRealizedFilterForm }