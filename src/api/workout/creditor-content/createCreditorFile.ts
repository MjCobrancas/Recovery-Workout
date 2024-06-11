'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createCreditorFile<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `http://144.91.80.153:9999/workout-create-creditor-file`, {
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

export async function uploadCreditorFile(
    idForm: number,
    file: any
) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    console.log("IdForm:", idForm)
    console.log(file)

    const uploadFilename = await fetch(
        `http://144.91.80.153:9999/workout-upload-file-creditor/${idForm}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userParse.accessToken}`,
            },
            body: file,
        }
    )
        .then(async (resp) => {
            if (resp.status == 400) {
                return false
            }

            return true
        })
        .catch(() => {
            return false
        })

    return uploadFilename
}
