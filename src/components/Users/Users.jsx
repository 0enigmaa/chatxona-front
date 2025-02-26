import React, { use, useEffect, useState } from 'react'
import { useInfoContext } from '../../context/Context'
import UserIcon from '../../images/UserLogo.png'
import { toast } from 'react-toastify'
import { getAllUser } from '../../api/userRequest'
import { findChat } from '../../api/chatRequest'
import './Users.css'
const serverUrl = process.env.REACT_APP_SERVER_URL

const Users = ({ modal, setModal }) => {

    const { currentUser, setUserInfo, onlineUsers, chats, setChats, exit, currentChat, setCurrentChat } = useInfoContext()

    const [users, setUsers] = useState([])


    const isOnline = (id) => {
        const online = onlineUsers.find((user) => user.userId === id)
        return online ? true : false
    }

    const getUsers = async () => {
        try {
            toast.loading('Please wait..')
            const res = await getAllUser();
            setUsers(res.data.users)
            toast.dismiss()
        } catch (error) {
            toast.dismiss()
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])


    const createdChat = async (firstId, secondId) => {
        try {
            const res = await findChat(firstId, secondId)
            if (!chats.some(chat => chat._id === res.data.chat._id)) {
                setChats([...chats, res.data.chat])
            }
            console.log(res);
            setCurrentChat(res.data.chat)
        } catch (error) {
            console.log(error);
            if (error.response.data.message === "JWT expired") {
                exit()
            }
        }
    }



    return (
        <div className='users-list'>
            {
                users && users.map(user => {
                    if (user._id !== currentUser._id) {
                        return <div key={user._id} className="user-info-box">
                            {
                                isOnline(user._id) && <div className="dot-online"></div>
                            }
                            <img onClick={() => {
                                setUserInfo(user)
                                setModal('info')
                            }} width={50} src={user?.profilePicture ? `${serverUrl}/${user.profilePicture}` : UserIcon} alt="profile-_img" className="profile-img" />

                            <div className="user-name">
                                <h3 className="name">{user.firstname} {user.lastname}</h3>
                                <span className={isOnline(user._id) ? "status" : "status-off"}>
                                    {isOnline(user._id) ? 'online' : 'offline'}
                                </span>
                            </div>

                            <button onClick={() => createdChat(user._id, currentUser._id)} className="message-btn button">
                                <i className="fa-solid fa-comment fa-lg"></i>
                            </button>
                        </div>

                    }

                })
            }
        </div>
    )
}

export default Users
