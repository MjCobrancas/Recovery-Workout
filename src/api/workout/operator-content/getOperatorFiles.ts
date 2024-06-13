'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IOperatorFilesList } from "@/interfaces/workout/operator-content/IEditOperatorContent"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getOperatorFilesList(idOperator: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-operator-files/${idOperator}`, {
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
                data: data as IOperatorFilesList[],
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