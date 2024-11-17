import axios from 'axios';
import React, { useContext, useRef } from 'react'
import { UserContext } from '../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { ResorcesContext } from '../providers/ResorcesProvidser';
import { SnackbarContext } from '../providers/SnakeBarProvider';

const Login = () => {

    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!



    const { user, setuser } = useContext(UserContext)!
    const { setresources } = useContext(ResorcesContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigat = useNavigate();


    const submitHendler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userLogin = {
            name: nameRef.current!.value,
            password: passwordRef.current!.value
        }

        try {

            axios.post('http://localhost:3300/auth/login', userLogin, { withCredentials: true })
                .then(res => {

                    try {
                        axios.get(`http://localhost:3300/api/user/${res.data.id}`).then(res => {
                            setuser(res.data);
                            try {
                                axios.get(`http://localhost:3300/api/organizationMissiles/${res.data.organizationId}`).then(res => {
                                    setresources(res.data);

                                    showSnackbar('User logged in successfully!!');
                                    setTimeout(() => {
                                        hideSnackbar();
                                        navigat('/current');
                                    }, 2000);
                                })

                            } catch (error) {
                                console.log(error);

                            }
                        })
                    }

                    catch (err) {
                        console.log(err);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
        catch (err) {
            console.log(err);
        }


    }

    return (

        <div>
            {user.name && <h1>hello {user.name}</h1>}
            <form onSubmit={submitHendler}>
                <input type="text" placeholder='username' ref={nameRef} required />
                <input type="password" placeholder='password' ref={passwordRef} required />
                <button type='submit'>LOGIN</button>
            </form>
            {isOpen && (
                <div className="snackbar" style={{ backgroundColor: 'green' }}>
                    {message}
                </div>
            )}
        </div>
    )
}

export default Login
