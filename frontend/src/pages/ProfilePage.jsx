import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../atom/userAtom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const setLogOutUser = useSetRecoilState(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();

                if (data.error) {
                    console.log(data.error);
                } else {
                    setUser(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [username]);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()
            if(data.error) {
                console.log(data.error)
                return
            }

            localStorage.removeItem("user-threads")
            setLogOutUser(null)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>No user found</div>;



    return (
        <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                        <RxAvatar className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4 text-white" />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                {user.username}
                            </h3>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                {user.name}
                            </h3>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                                {user.email}
                            </h3>
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mt-20">
                                <button onClick={handleLogout} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Log Out</button>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;