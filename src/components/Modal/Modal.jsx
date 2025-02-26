import React, { useState } from 'react'
import './Modal.css'
import { useInfoContext } from '../../context/Context'
import coverImg from "../../images/coverPicture.jpg"
import userIcon from '../../images/UserLogo.png'
import { updateUser } from '../../api/userRequest'

const serverUrl = "http://localhost:4000"

const Modal = ({ modal, setModal }) => {
    const { userInfo, setUserInfo, currentUser, setCurrentUser, exit } = useInfoContext()

    const [update, setUpdate] = useState(false)

    const handleEditForm = async (e) => {
        e.preventDefault()

        try {
            setUpdate(true)
            const formData = new FormData(e.target)
            const res = await updateUser(currentUser._id, formData)
            console.log(res);

            setCurrentUser(res.data.user)
            setUserInfo(res.data.user)
            localStorage.setItem('profile', JSON.stringify(res.data.user))
            setUpdate(false)

        } catch (error) {
            console.log(error);

            setUpdate(false)
            if (error.response.data.message === "JWT expired") {
                exit()
            }

        }
    }

    return (
        <div className='info-modal'>
            <div className='w-50'>
                <button onClick={() => setModal(false)} className='close-btn-button'>
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="info-card">
                    <div className="profile-images">
                        <img src={userInfo?.coverPicture ? `${serverUrl}/${userInfo.coverPicture}` : coverImg} alt="cover_image" className='cover-img' />
                        <img src={userInfo?.profilePicture ? `${serverUrl}/${userInfo.profilePicture}` : userIcon} alt="profile_img" className='prof-img' />
                    </div>

                    {
                        modal === "info" ?
                            <>
                                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">User Information</h2>
                                <div className="space-y-2 card w-100 m-auto p-4">
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-blue-600">Name: {userInfo.firstname}</h5>
                                        </div>

                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-green-600">Lastname: {userInfo.lastname}</h5>
                                        </div>

                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-red-600">Email: {userInfo.email}</h5>

                                        </div>


                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-yellow-600">Relationship: {userInfo.relationship}</h5>

                                        </div>

                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-purple-600">About: {userInfo.about}</h5>

                                        </div>

                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-indigo-600">Country: {userInfo.country}</h5>

                                        </div>

                                        <div className="col-6 mb-2">
                                            <h5 className="text-lg text-pink-600">Works: {userInfo.works}</h5>

                                        </div>
                                        <div className="col-6">
                                            <h5 className="text-lg text-teal-600">Lives In: {userInfo.livesIn}</h5>

                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <form onSubmit={handleEditForm} action="" className='edit-form auth-form'>
                                    <div className="row">
                                        <div className="col-6 mb-2">
                                            <input type="text" className='info-input form-control' name='firstname' required defaultValue={currentUser.firstname} />

                                        </div>
                                        <div className="col-6">
                                            <input type="text" className='info-input  form-control' name='lastname' required defaultValue={currentUser.lastname} />
                                        </div>

                                        <div className="col-6 mb-2">
                                            <input type="email" className='info-input  form-control' name='email' required defaultValue={currentUser.email} />

                                        </div>

                                        <div className="col-6">
                                            <input type="text" className='info-input  form-control' name='about' required defaultValue={currentUser.about} placeholder='about...' />

                                        </div>

                                        <div className="col-6 mb-2">
                                            <input type="text" className='info-input  form-control' name='country' required defaultValue={currentUser.country} placeholder='country...' />

                                        </div>

                                        <div className="col-6">
                                            <input type="text" className='info-input  form-control' name='works' required defaultValue={currentUser.works} placeholder='works...' />

                                        </div>

                                        <div className="col-6 mb-2">
                                            <input type="text" className='info-input  form-control' name='livesIn' required defaultValue={currentUser.livesIn} placeholder='livesIn...' />

                                        </div>

                                        <div className="col-6">
                                            <input type="text" className='info-input  form-control' name='relationship' required defaultValue={currentUser.relationship} placeholder='relationship...' />

                                        </div>
                                    </div>

                                    <div className="img-input-box">
                                        <label htmlFor="edit-file-input">
                                            ProfilePicture
                                            <input type="file" id='edit-file-input' name='profilePicture' />
                                        </label>

                                        <label htmlFor="edit-file-input2">
                                            coverPicture
                                            <input type="file" id='edit-file-input2' name='coverPicture' />
                                        </label>
                                    </div>


                                    <div className='btn-update'>
                                        <button disabled={update} className='btn btn-primary text-light'>{update ? 'Updating...' : 'Update'}</button>

                                    </div>
                                </form>
                            </>
                    }
                </div>
            </div>
        </div>

    )
}

export default Modal