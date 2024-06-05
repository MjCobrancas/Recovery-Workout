'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function workoutAbleUsers() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/workout-get-able-users`, {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value: any) => {
        let data = await value.json()

        if (value.status == 400) {
            return false
        }

        return data
        })
        .catch((error) => {
        return false
        })

    return resp
}