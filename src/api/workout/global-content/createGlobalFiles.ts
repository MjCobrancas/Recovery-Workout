'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function createGlobalFiles<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-create-global-file`, {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object)
    })
        .then(async (value: any) => {
        const data = await value.json()
        console.log(data)

        return {
            data: data,
            status: true,
        }
        })
        .catch((error) => {
        console.log(error)
        return {
            data: null,
            status: false
        }
        })

    return resp
}

export async function uploadGlobalFile(idForm: number, file: any) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    console.log("IdForm:", idForm)
    console.log(file)

    const uploadFilename = await fetch(
        `${process.env.BACKEND_DOMAIN}/workout-upload-global-file/${idForm}`,
        {
        method: "POST",
        headers: {
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: file,
        }
    )
        .then(async (resp) => {
        if (resp.status == 400) {
            console.log('a')
            return false
        }

        return true
        })
        .catch(() => {
        console.log('b')
        return false
        })

    return uploadFilename
}

export async function uploadInitialGlobalFile(idForm: number, file: any) {
    const userParse: ITokenUserInitialValues = GetUserToken()

  console.log("IdForm:", idForm)
  console.log(file)

  const uploadFilename = await fetch(
    `${process.env.BACKEND_DOMAIN}/workout-upload-global-file-initial/${idForm}`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: file,
    }
  )
    .then(async (resp) => {
      if (resp.status == 400) {
        console.log('a')
        return false
      }

      return true
    })
    .catch(() => {
      console.log('b')
      return false
    })

  return uploadFilename
}