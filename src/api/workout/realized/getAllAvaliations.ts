'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAllAvaliations } from "@/interfaces/workout/realized/IGetAllAvaliations"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllAvaliations() {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/workout-get-realized-avaliations`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status == 400) {
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