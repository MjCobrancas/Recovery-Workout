'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { IQuotesCloneUpdateResponse } from "@/interfaces/workout/prepare-typeracer/IDialogCloneQuotes";
import { IQuotes } from "@/interfaces/workout/prepare-typeracer/IEditQuotes";
import { GetUserToken } from "@/utils/GetUserToken";

export async function cloneQuotes(id_creditor: number, quotesUpdate: IQuotesCloneUpdateResponse[], quotesCreate: IQuotes[]) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-clone-quotes`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_creditor, quotesCreate, quotesUpdate})
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data.data,
                status: true
            }
        })
        .catch((error) => {

            return {
                data: null,
                status: false
            }
        })

    return resp
}