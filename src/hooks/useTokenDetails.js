
import { useContext } from 'react';
import AuthContext from './../context/AuthProvider';
import { jwtDecode } from 'jwt-decode';

const useIsAdmin = () => {
    const { auth } = useContext(AuthContext);
    let roles;

    if (auth && auth.accessToken) {
        const decodedToken = jwtDecode(auth.accessToken);
        console.log("decoded token =>", decodedToken);
        roles = decodedToken.roles;

    } else {
        console.log("Token is not set.");
        return;
    }

    return roles.find(role => role === "ADMIN") ? true : false;
}

export { useIsAdmin }

