'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getInstructionsFileList(idUser: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()
  
    const resp = await fetch(
      `${process.env.BACKEND_DOMAIN}/workout-instructions-list`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken
      },
      body: JSON.stringify({
        id_user: idUser
      })
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