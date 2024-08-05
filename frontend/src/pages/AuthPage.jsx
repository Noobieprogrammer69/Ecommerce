import { Login, Signup } from "../components"
import { useRecoilValue } from "recoil"
import authScreenAtom from "../atom/authAtom"

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom)  
    console.log(authScreenState)

    return (
       <>
        { authScreenState === "login" ? <Login /> : <Signup /> }
       </>
    )
}

export default AuthPage
