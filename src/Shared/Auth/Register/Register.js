import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [errorpassword, seterrorpassword] = useState()
    const { createUser, googleLogin, updateName } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.yourname.value;
        const email = form.email.value;
        const password = form.password.value;
        const university = form.university.value;
        const address = form.address.value;

        if (password.length < 6) {
            seterrorpassword('password should be 6 characters')
        }

        console.log(name, email, password, university, address);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                saveUser(name, email, university, address)
                toast.success('User signUp Successfully!')
                updateName(name)
                form.reset()
                navigate('/')
            })
            .catch(error => {
                toast.error('Something was wrong! Please try again!')
                
            });
    }


    const saveUser = (name, email, university, address) => {
        const user = { name, email, university, address }
        fetch('https://social-media-server-six.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }


    const google = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                toast.success('User signUp Successfully!')
                console.log(user);
            })
            .catch(error => {
                console.log(error)
                toast.error('Something was wrong! Please try again!')
            });
    }

    return (
        <div className='2xl:container 2xl:mx-auto mt-7'>
            <div className="pb-20 pt-20">
                <div className="px-6 h-full text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                        <div
                            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="w-full"
                                alt="Sample image"
                            />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">

                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="text-lg mb-0 mr-4">Register with</p>
                                <button
                                    onClick={google}
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    className="inline-block p-3 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md  hover:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                >

                                    <svg className="w-6 h-6" viewBox="0 0 40 40">
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                        <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                        <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                        <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                    </svg>
                                </button>
                            </div>

                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">Or</p>
                            </div>
                            <form onSubmit={handleSignUp}>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Your Name"
                                        name='yourname'
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Your University"
                                        name='university'
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Address"
                                        name='address'
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                        name='email'
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                        name='password'
                                    />
                                </div>

                                <div className="text-center lg:text-left">
                                    <input type="submit" value="Register"
                                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer "
                                    />
                                    <h2 className="text-md font-semibold mt-2 pt-1 mb-0">{errorpassword}</h2>
                                    <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                        Already have an account?
                                        <Link to="/login" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                                            Login Now
                                        </Link>
                                    </p>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;