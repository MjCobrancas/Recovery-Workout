'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function workoutList() { 
    const userParse: ITokenUserInitialValues = GetUserToken()

    return await fetch(`${process.env.BACKEND_DOMAIN}/workout-list`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
    .then(async (value) => {
        const data = await value.json()

        return data
    })
    .catch((error) => {
        const data = null

        return data
    })

}