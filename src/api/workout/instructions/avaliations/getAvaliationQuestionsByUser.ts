'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAvaliationQuestionsResponse } from "@/interfaces/workout/instructions/IAvaliationForm"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAvaliationQuestionsByIdUser() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-creditor-questions`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_user: userParse.idUser })
    })
        .then(async (value: any) => {
            const data = await value.json()

            return {
                data: data as IGetAvaliationQuestionsResponse,
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