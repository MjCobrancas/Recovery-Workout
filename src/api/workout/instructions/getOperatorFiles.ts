'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

let nameOfPdf = ''

export async function getOperatorFiles(id: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()
  
    const resp = await fetch(
      `${process.env.BACKEND_DOMAIN}/download-workout-operator-file/${id}`, {
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
      .then(async (value: any) => {
      
        return {
          url: URL.createObjectURL(value),
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