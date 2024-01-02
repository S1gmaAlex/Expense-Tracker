import Signup from "../components/Signup"
import Login from "../components/Login"
import { useRecoilValue } from "recoil";
import authScreenAtom from "../atoms/authAtom";
const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    return <>{authScreenState === "login" ? <Login /> : <Signup />}</>;
}

export default AuthPage