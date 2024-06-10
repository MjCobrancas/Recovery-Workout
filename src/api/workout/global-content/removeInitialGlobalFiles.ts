'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function removeInitialGlobalFiles(id: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-remove-initial-global-file/${id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
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