'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function workoutQuitterUsers() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    return await fetch(`${process.env.BACKEND_DOMAIN}/workout-get-quitter-users`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value) => {
            let data = await value.json()

            if (value.status == 400) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data,
                status: true
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        })
}