import { Outlet } from "react-router-dom";
import NotFound from "./NotFound";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";

export default function Protection() {
    const data = useTokenDecoder();
    const role = data?.role;
    if (window.localStorage.getItem("token") && role) {
        return <Outlet />;
    } else {
        return 
    }
}
