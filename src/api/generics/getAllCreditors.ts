export async function getAllCreditors(accessToken: string) {
    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-creditors`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      next: {
        tags: ["allCreditors"]
      }
    })
      .then(async (value: any) => {
        const data = await value.json()
  
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