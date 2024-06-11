'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorFilesObject } from "@/interfaces/workout/creditor-content/IEditCreditorContent"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function updateCreditorFiles(object: ICreditorFilesObject) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-update-creditor-files`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object)
    })
        .then(async (value: any) => {
            const data = await value.json()

            if (data.data == null) {
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

    revalidateTag("get-creditors-files-content")

    return resp
}
