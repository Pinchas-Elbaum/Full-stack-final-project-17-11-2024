import { useContext, useRef } from "react";
import axios from "axios";
import { SnackbarContext } from "../providers/SnakeBarProvider";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/Types";

const Register = () => {

    const { message, isOpen, showSnackbar, hideSnackbar } = useContext(SnackbarContext)!

    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const organizationRef = useRef<HTMLSelectElement>(null);
    const arearef = useRef<HTMLSelectElement>(null);

    const organizations = ["IDF - North", "Hezbollah", "Hamas", "IRGC", "Houthis"];
    const areas = ["North", "South", "Center", "West Bank"];

    const navigat = useNavigate();

    const submitHeandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user: IUser = {
            name: nameRef.current!.value,
            password: passwordRef.current!.value,
            organization: organizationRef.current!.value,
            area: arearef.current!.value
        };

        nameRef.current!.value = "";
        passwordRef.current!.value = "";
        organizationRef.current!.value = "";
        arearef.current!.value = "";

        try {
            axios.post("http://localhost:3300/auth/register", user);

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
                <select id="organization" ref={organizationRef}>
                    {organizations.map((organization) => (
                        <option key={organization} value={organization}>
                            {organization}
                        </option>
                    ))}
                </select>

                <label htmlFor="area">Area</label>
                <select id="area" ref={arearef}>
                    <option value=""></option>
                    {areas.map((area) => (
                        <option key={area} value={area}>
                            {area}
                        </option>
                    ))}
                </select>

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