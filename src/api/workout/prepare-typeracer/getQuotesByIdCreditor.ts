'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getQuotesByIdCreditor(id_creditor: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-quotes-by-id-creditor`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_creditor: id_creditor
        })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: [],
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
                data: [],
                status: false
            }
        })

    return resp
}