import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function getUserName() {
    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-user-name`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_user: userValues.id })
    })
        .then(async (value) => {
            let data = await value.json()

            if (data.errors.length > 0) {
                return null
            }

            return data
        })
        .catch((error) => {
            return null
        })

    return resp
}