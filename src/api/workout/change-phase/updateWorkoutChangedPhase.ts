'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

interface IObject { 
  id_workout: number
  id_phase: number
  id_responsible: number
  is_finish_workout: boolean
  is_dimissal: boolean
}

export async function updateWorkoutChangedPhase(object: IObject) {
    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    object.id_responsible = Number(userValues.id)

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