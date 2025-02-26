import React, { useEffect, useState } from 'react'
import UserIcon from '../../images/UserLogo.png'
import './Conversetion.css'
import { useInfoContext } from '../../context/Context'
import { getUser } from '../../api/userRequest';
const serverUrl = process.env.REACT_APP_SERVER_URL;


const Conversetion = ({ chat }) => {
    const { currentUser, exit, onlineUsers, setUserInfo, setCurrentChat, } = useInfoContext();

    const [user, setUser] = useState(null);
    const userId = chat.members.find(id => id !== currentUser._id);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getUser(userId);
                setUser(res.data.user)
            } catch (error) {
                if (error.response.data.message === "JWT expired") {
                    exit()
                }
            }
        }

        getData();
    }, [userId])




    const isOnline = (id) => {
        const online = onlineUsers.find((user) => user.userId === id)
        return online ? true : false
    }


    return (
        <div onClick={() => setCurrentChat(chat)} className="user-info-box">
            {
                isOnline(user?._id) && <div ></div>
            }
            <img width={50} src={user?.profilePicture ? `${serverUrl}/${user.profilePicture}` : UserIcon} alt="profile-_img" className="profile-img" />

            <div className="user-name">
                <h3 className="name">{user?.firstname} {user?.lastname}</h3>
                <span className={isOnline(user?._id) ? "status" : "status-off"}>
                    {isOnline(user?._id) ? 'online' : 'offline'}
                </span>
            </div>



        </div>
    )

}

export default Conversetion
