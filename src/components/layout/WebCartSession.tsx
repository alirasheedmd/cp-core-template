import { createSessionCartId } from "@/lib/auth"

const WebCartSession = async () => {
    const session = await createSessionCartId()
    console.log("session Cart id ", session)
  return <></>
}

export default WebCartSession