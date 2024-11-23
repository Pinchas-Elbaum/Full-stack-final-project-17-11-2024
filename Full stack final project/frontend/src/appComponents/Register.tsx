import { useContext, useRef, useState } from "react";
import axios from "axios";
import { SnackbarContext } from "../providers/SnakeBarProvider";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/Types";

const Register = () => {

    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [organization, setorganization] = useState('');
    const arearef = useRef<HTMLSelectElement>(null);

    const organizations = ["IDF", "Hezbollah", "Hamas", "IRGC", "Houthis"];
    const areas = ["North", "South", "Center", "West Bank"];

    const navigat = useNavigate();

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user: IUser = {
            name: nameRef.current!.value,
            password: passwordRef.current!.value,
            organization: `${organization} - ${arearef.current!.value}`,
            area: arearef.current!.value
        };

        nameRef.current!.value = "";
        passwordRef.current!.value = "";
        setorganization("");
        arearef.current!.value = "";

        try {
            axios.post("http://localhost:3300/auth/register", user).then(res => res.data.success)

            showSnackbar('User added successfully!!');
            setTimeout(() => {
                hideSnackbar();
                navigat('/');
            }, 2000);
        }

        catch (err) {
            console.log(err);

            showSnackbar('Error!!');
            setTimeout(() => {
                hideSnackbar();
                navigat('/register');
            }, 2000);
        }
    }


    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={submitHeandler}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={passwordRef} required />

                <label htmlFor="organization">Organization</label>
                <select id="organization" value={organization} onChange={(e) => { setorganization(e.target.value) }}>
                    {organizations.map((organization) => (
                        <option key={organization} value={organization}>
                            {organization}
                        </option>
                    ))}
                </select>
                {organization == "IDF" && (<div>
                    <label htmlFor="area">area</label>
                    <select id="area" ref={arearef}>
                        {areas.map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

                )}


                <button type="submit">Register</button>

            </form>

            {isOpen && (
                <div className="snackbar">
                    {message}
                </div>
            )}
            <button onClick={() => { navigat('/') }}>Home</button>
        </div>
    )
}

export default Register