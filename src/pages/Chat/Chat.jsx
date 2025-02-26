import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useInfoContext } from '../../context/Context'
import Search from '../../components/Search/Search'
// import Users from '../../components/Users/Users'
import Modal from '../../components/Modal/Modal'
import { io } from 'socket.io-client'
import { getUserChat } from '../../api/chatRequest'
import Conversetion from '../../components/conversetion/Conversetion'
import ChatBox from '../../components/chatBox/ChatBox'
const serverUrl = process.env.REACT_APP_SERVER_URL;

const socket = io(serverUrl)


const Chat = () => {

    const { exit, setUserInfo, currentUser, onlineUsers, setOnlineUser, currentChat, setChats, chats, } = useInfoContext();
    const [modal, setModal,] = useState(false);




    // socket 

    useEffect(() => {
        socket.emit('new-user-add', currentUser._id)
        socket.on('get-users', (users) => {
            setOnlineUser(users)

        })
    }, [currentUser._id])


    useEffect(() => {
        const getChats = async () => {
            try {
                const res = await getUserChat()

                setChats(res.data.chats)

            } catch (error) {
                if (error.response.data.message === "jwt expired") {
                    exit()
                }
            }
        }

        getChats()
    }, [])

    return (
        <div className='chat-page'>
            <div className="chat-left-side">
                {/* search andusers */}
                <Search modal={modal} setModal={setModal} />
            </div>

            <div className="middle-side">
                <ChatBox socket={socket} setModal={setModal} />
            </div>

            <div className="chat-right-side">
                <div className="right-side-top">
                    <button onClick={() => {
                        exit()
                        socket.emit('disconnect2')
                    }} className="btn btn-danger m-1">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                    <button onClick={() => {
                        setUserInfo(currentUser)
                        setModal("settings")
                    }} className="btn btn-secondary m-2">
                        <i className="fa-solid fa-gear"></i>
                    </button>
                </div>

                <div className="chats-list">
                    <h2>Chat list</h2>
                    {
                        chats.length
                            ? chats.map(chat => {
                                return (<div key={chat._id} className="chat-item">
                                    <Conversetion chat={chat} />
                                </div>)
                            })
                            : <h2>Chats not found</h2>
                    }
                </div>




            </div>



            {modal && <Modal modal={modal} setModal={setModal} />}

        </div>
    )
}

export default Chat
