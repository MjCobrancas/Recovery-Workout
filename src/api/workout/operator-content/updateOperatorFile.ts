'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IOperatorFilesObject } from "@/interfaces/workout/operator-content/IEditOperatorContent"
import { GetUserToken } from "@/utils/GetUserToken"

export async function updateOperatorFiles(object: IOperatorFilesObject) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-update-operator-files`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object)
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
