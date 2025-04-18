import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast'; // Ensure toast is imported
import axios from 'axios'; // Ensure axios is imported
const Login = () => {
    const { setShowUserlogin, setUser, navigate } = useAppContext();

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const { data } = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password,
            });

            if (data.success) {
                toast.success(data.message); // Display success message
                navigate('/');
                setUser(data.user);
                setShowUserlogin(false);
            } else {
                toast.error(data.message ); // Display error message
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || "Something went wrong!"); // Handle errors
        }
    };

    return (
        <div onClick={() => setShowUserlogin(false)} className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name} // If `name` is undefined, this will cause the issue
                            placeholder="Type here"
                            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                            type="text"
                            required
                        />
                    </div>
                )}
                <div className="w-full">
                    <p>Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                        type="email"
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Type here"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary-dull"
                        type="password"
                        required
                    />
                </div>
                {state === "register" ? (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setState("login")} className="text-primary cursor-pointer">
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Create an account?{" "}
                        <span onClick={() => setState("register")} className="text-primary cursor-pointer">
                            Click here
                        </span>
                    </p>
                )}
                <button className="bg-primary hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
