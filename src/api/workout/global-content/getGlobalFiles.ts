'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getGlobalFiles() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-global-files`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ["get-global-files"]
        }
    })
        .then(async (value) => {
            const data = await value.json()

            return {
                data: data,
                status: true,
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