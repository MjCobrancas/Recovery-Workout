'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAllAvaliations } from "@/interfaces/workout/realized/IGetAllAvaliations"
import { GetUserToken } from "@/utils/GetUserToken"

export async function avaliationFilter<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-filter-avaliations`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object)
    })
        .then(async (value) => {
            const data = await value.json()
            
            if (value.status != 200) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data.data as IGetAllAvaliations[],
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
