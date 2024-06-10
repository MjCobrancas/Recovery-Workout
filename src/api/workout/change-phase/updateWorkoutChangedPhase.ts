'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function updateWorkoutChangedPhase<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/workout-update-user-phase`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify(object)
    })
      .then(async (value) => {
        let data = await value.json()
  
        if (value.status == 400) {
          return false
        }
  
        return data
      })
      .catch((error) => {
        return false
      })
  
    return resp
  }