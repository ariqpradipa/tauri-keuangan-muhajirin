import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Swal = require('sweetalert2')

var sha256 = require('js-sha256').sha256;
var axios = require('axios');

const Login = () => {

    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    var scramble = "MasjidAl-Muhajirin";

    const onSubmitForm = async (e) => {
        e.preventDefault(); //prevent refresh

        if (username === "" || password === "") {

            Swal.fire({
                position: 'top',
                icon: 'info',
                title: 'Username atau Password tidak dapat kosong',
                showConfirmButton: false,
                timer: 1500
            });

        } else {
            axios
                .post("http://localhost:4000/login", {
                    username: username,
                })
                .then(function (response) {

                    var hexPassword = sha256(scramble + password + scramble);

                    if (response.data.username === username && response.data.password === hexPassword) {

                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Login Berhasil',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        nav("/home");
                        return;

                    } else {

                        Swal.fire({
                            position: 'top',
                            icon: 'error',
                            title: 'Username atau Password Salah',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    };

    return (
        <>
            <div className="h-screen flex bg-gray-bg1">
                <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
                    <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center uppercase">
                        Pengolahan Keuangan Masjid Al-Muhajirin
                    </h1>

                    <form onSubmit={onSubmitForm}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className={`w-full p-2 text-primary border-2 focus:border-black rounded-md outline-none text-sm transition duration-300 ease-in-out mb-4`}
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`w-full p-2 text-primary border-2 focus:border-black rounded-md outline-none text-sm transition duration-500 ease-in-out mb-4`}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </div>

                        <div className="flex justify-center items-center mt-6">
                            <button
                                key="SignIn"
                                className="no-underline text-white rounded-lg font-semibold  active:bg-gray-500 bg-black py-2 px-4 transition duration-75 ease-in-ou"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
