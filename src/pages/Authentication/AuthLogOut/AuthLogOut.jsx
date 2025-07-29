import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const AuthLogOut = () => {
    const { logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then(res => {
                console.log(res);
                Swal.fire({
                    icon: "success",
                    title: "LogOut successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <button onClick={handleLogOut}>Logout</button>
        </>
    );
};

export default AuthLogOut;