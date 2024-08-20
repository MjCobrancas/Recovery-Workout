'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function getQuotes() {
    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-quotes-by-id-user`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_user: userValues.id })
    })
        .then(async (value) => {
            const data = await value.json()
            
            if (value.status != 200) {
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
