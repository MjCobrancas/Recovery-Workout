'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IWorkoutInitialGlobalFilesResponse } from "@/interfaces/workout/instructions/WorkoutFiles"
import { GetUserToken } from "@/utils/GetUserToken"

let nameOfPdf = ""

export async function getInitialGlobalFiles() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-get-initial-global-files`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken
        }
    })
        .then(async (value) => {
            const data = await value.json()

            return {
                data: data as IWorkoutInitialGlobalFilesResponse[],
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

export async function getInitialGlobalFile(id: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/download-workout-initial-global-file/${id}`, {
        method: "GET",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/pdf",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value: any) => {
            nameOfPdf = value.headers.get("Content-Disposition")

            return await value.blob()
        })
        .then(async (value) => {

            let ab = await value.arrayBuffer();
            let object = {
                file: Array.from(new Uint8Array(ab)),
                type: value.type,
            };

            return {
                object,
                name: nameOfPdf,
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