'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IAvaliationOperator } from "@/interfaces/workout/realized/IAvaliationDialog"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAvaliationOperator(idForm: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-avaliation-forms/${idForm}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
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
                data: data as IAvaliationOperator,
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