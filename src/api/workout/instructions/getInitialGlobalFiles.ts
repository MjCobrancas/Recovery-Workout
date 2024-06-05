'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
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
      .then(async (value: any) => {
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

export async function getInitialGlobalFile(id: number) {
        const userParse: ITokenUserInitialValues = GetUserToken()

        const resp = await fetch(
            `http://144.91.80.153:9999/download-workout-initial-global-file/${id}`, {
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