'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorAvaliationQuestionsResponse } from "@/interfaces/workout/prepare-avaliation/IPrepareAvaliationInitialForm"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorAvaliationQuestions(object: { id_creditor: number }) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-avaliation-questions`, {
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

            if (data.errors.length > 0) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data.data as ICreditorAvaliationQuestionsResponse,
                status: true
            }
        })
        .catch((error) => {

            return {
                data: null,
                status: false,
            }
        })

    return resp
}
