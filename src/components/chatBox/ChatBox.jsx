import React, { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import { useInfoContext } from '../../context/Context'
import { toast } from 'react-toastify';
import { getUser } from '../../api/userRequest';
import UserIcon from '../../images/UserLogo.png'
import { addMessage, getMessage } from '../../api/messageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';
const serverUrl = process.env.REACT_APP_SERVER_URL



const ChatBox = ({ setModal, socket }) => {
  const { currentChat, currentUser, exit, setUserInfo, onlineUsers } = useInfoContext();

  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [sendMessage, setSendMessage] = useState(null);


  const [answeMessage, setAnswerMessage] = useState(null)


  const [textMessage, setTextMessage] = useState("");


  const imgRef = useRef();
  const scroll = useRef();

  const id = currentChat?.members.find(id => id !== currentUser._id);


  const isOnline = (id) => {
    const online = onlineUsers.find((user) => user.userId === id);
    return online ? true : false;
  }


  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await getUser(id);
        setUser(res.data.user)
        toast.dismiss()
      } catch (error) {
        toast.dismiss()
        toast.error(error.response.data.message)
        if (error.response.data.message === "JWT expired") {
          exit()
        }
        console.log(error)
      }
    }

    currentChat && getUserData()
  }, [currentChat])



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getMessage(currentChat._id);
        setMessages(res.data.messages)
        toast.dismiss()
      } catch (error) {
        toast.dismiss()
        toast.error(error.response.data.message)
        if (error.response.data.message === "JWT expired") {
          exit()
        }
        console.log(error)
      }
    }

    currentChat && fetchMessages()
  }, [currentChat])

  // send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage)
    }
  }, [sendMessage])


  useEffect(() => {
    socket.on("answer-message", (data) => {
      setAnswerMessage(data)
    })
  }, [sendMessage])

  useEffect(() => {
    if (currentChat && answeMessage !== null && answeMessage.chatId === currentChat._id) {
      setMessages([...messages, answeMessage])
    }
  }, [answeMessage])




  const handleText = (e) => {
    setTextMessage(e)
  }





  const handleSend = async () => {
    const message = {
      senderId: currentUser._id,
      chatId: currentChat._id,
      text: textMessage,
      createdAt: new Date().getTime()
    }

    if (textMessage === '') {
      return
    }

    setSendMessage({ ...message, receivedId: id })
    try {
      const res = await addMessage(message);
      setMessages([...messages, res.data.newMessage])
      setTextMessage("")
    } catch (error) {
      console.log(error)
      if (error.response.data.message === "JWT expired") {
        exit()
      }
    }
  }


  return (
    <div className='chat-box'>
      {
        currentChat ? <>
          <div onClick={() => {
            setUserInfo(user)
            setModal('info')
          }} className="user-info-box">
            <img width={50} src={user?.profilePicture ? `${serverUrl}/${user.profilePicture}` : UserIcon} alt="profile_img" className="profile-img" />

            <div className="user-name">
              <h3 className="name">{user?.firstname} {user?.lastname}</h3>
              <span className={isOnline(user?._id) ? "status" : "status-off"}>
                {isOnline(user?._id) ? 'online' : 'offline'}
              </span>
            </div>
          </div>

          <div className="chat-body">
            {
              messages.map(message => {

                return (
                  <div key={message._id} className={message.senderId === currentUser._id ? "message meMessage" : "message"}>
                    {message.file && <img src="" alt="" className="message-img" />}
                    <span className="message-text">{message.text}</span>
                    <span className="message-data text-dark">  {format(message.createdAt)}</span>
                  </div>
                )
              })
            }
          </div>


          <div className="chat-sender">
            <button onClick={() => imgRef.current.click()} className=" btn sender-file-btn button btn-secondary">
              <i className="fa fa-paperclip"></i>
            </button>

            <InputEmoji value={textMessage} onChange={handleText} />

            <button onClick={handleSend} className=" btn send-btn-button btn-primary">
              <i className="fa-solid fa-paper-plane"></i>
            </button>

            <input type="file" name='image' ref={imgRef} className="message-file-input" />
          </div>

        </> : <>

          <div className='not-pelace'>
            <h2 className='text-center fs-3'>Tap on a chat to start conversation..</h2>
            <span className='m-3'>
              <i className="fa-solid fa-square-arrow-up-right fa-xl"></i>
            </span>
          </div>

        </>
      }
    </div>
  )
}

export default ChatBox
