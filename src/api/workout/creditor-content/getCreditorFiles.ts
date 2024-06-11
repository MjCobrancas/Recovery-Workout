'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorFilesList } from "@/interfaces/workout/creditor-content/IEditCreditorContent"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorFilesList(idCreditor: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-creditor-files/${idCreditor}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ["get-creditors-files-content"]
        }
    })
        .then(async (value) => {
            const data = await value.json()

            return {
                data: data as ICreditorFilesList[],
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