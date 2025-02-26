import React, { useState } from 'react'
import "./Auth.scss"
import Logo from "../../images/logo.png";
import { toast } from 'react-toastify';
import { login, register } from '../../api/authRequests';
import { useInfoContext } from '../../context/Context';

const Auth = () => {

    const { setCurrentUser } = useInfoContext();
    const [loading, setLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [confirmPass, setCofirmPass] = useState(true);

    const handleAuthForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setLoading(true);
        try {
            toast.loading("Please wait...");
            let res;

            if (!isSignup) {
                // sign up
                //password
                console.log(res);

                const password = formData.get("password");
                const confirmPassword = formData.get("confirmPassword");
                if (password === confirmPassword) {
                    setCofirmPass(true);
                    res = await register(formData);
                } else {
                    setCofirmPass(false);
                    toast.dismiss();
                    setLoading(false);
                    return;
                }
            } else {
                //login
                toast.success("Login successfuly")
                res = await login(formData);
            }
            console.log(res);

            setCurrentUser(res.data.user);
            localStorage.setItem("profile", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            toast.dismiss();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.dismiss();
            toast.error(error.response.data.message);
        }
    };


    return (
        <div className="auth-body">
            <div className='auth-page'>
                <div className="left-side">
                    <div className='auth-logo'>
                        <img width={250} src="https://img.freepik.com/premium-vector/chat-app-logo-design-template-can-be-used-icon-chat-application-logo_605910-1724.jpg" alt="logo" className="logo-img" />
                    </div>
                    <div className="chat-name">
                        <h1>Chatxona Media App</h1>
                        <h5>Explore with WEBSTAR IT ACADEMY</h5>
                    </div>


                </div>
                <div className="right-side">
                    <form onSubmit={handleAuthForm} action="" className="auth-form">

                        <h3>{isSignup ? "Login" : 'Signup'}</h3>

                        {
                            !isSignup && <>


                                <div>
                                    <input type="text" className="info-input form-control mb-2" name='firstname' placeholder='Enter your firstname' required />
                                </div>

                                <div>
                                    <input type="text" className="info-input form-control mb-2" name='lastname' placeholder='Enter your lastname' required />

                                </div>
                            </>
                        }






                        <div>
                            <input type="email" className="info-input  form-control mb-2" name='email' placeholder='Enter your email' required />
                        </div>

                        <div>
                            <input type="password" className="info-input form-control mb-2" name='password' placeholder='Enter your password' required />
                        </div>


                        {!isSignup && <div>
                            <input type="password" className="info-input form-control mb-2" name='confirmPassword' placeholder='Enter your password again' required />
                        </div>}






                        {
                            !confirmPass && <>
                                <span className="comfirm-span">Confirm password is not same!</span>

                            </>
                        }


                        <span onClick={() => setIsSignup(!isSignup)} className='info-span'>{
                            isSignup ? "Dont save an account" : "Already have an account, Login"}</span>
                        <button disabled={loading} className=' btn info-btn'>{isSignup ? "Login" : 'Signup'}</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;