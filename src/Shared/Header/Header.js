import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const Header = () => {

    const { user, UserlogOut } = useContext(AuthContext);

    let arr = [true, false, false, false, false, false]
    const [style, setStyle] = useState(arr);
    const [dropDown, setDropDown] = useState(true);
    const [text, setText] = useState("");

    const selected = (props) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = false;
        }
        newArr[props] = true;
        setStyle(newArr);
    }

    const setSelectedText = (txt) => {
        setText(txt);
        setDropDown(true);
    }

    const handleUserLogout = () => {
        UserlogOut()
            .then(toast.success('User logged out!'))
            .catch(error => console.log(error))
    }
    return (
        <div className="2xl:container 2xl:mx-auto mt-7">
            <div className="bg-white rounded shadow-lg py-6 px-10">
                <nav className="flex justify-between">
                    <div onClick={() => setSelectedText("Home")} className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <Link to='/'><h2 onClick={() => selected(0)} className="font-normal lg:text-left text-center text-2xl leading-6 mb-6 text-gray-800" >Risan Media</h2></Link>
                    </div>
                    {/* For medium and plus sized devices */}

                    <div className=" flex space-x-5 justify-center items-center pl-2">
                        <ul className="hidden md:flex flex-auto space-x-2">
                            <Link to='/'>
                                <li onClick={() => selected(0)} className={`${style[0] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded`}>Home</li>
                            </Link>
                            {
                                user?.uid ? <>
                                <Link to='/media'>
                                <li onClick={() => selected(1)} className={`${style[1] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded`}>Media</li>
                            </Link>
                            <Link to='/about'>
                                <li onClick={() => selected(2)} className={`${style[2] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded`}>About</li>
                            </Link>

                            <Link to='/message'>
                                <li onClick={() => selected(3)} className={`${style[3] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded `}>Message</li>
                            </Link>
                                
                                </> : <></>
                            }

                            {
                                user?.email ? 
                                <button className='   text-gray-600 border border-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded'
                                onClick={handleUserLogout}>LogOut</button>

                                    : <>



                                        <Link to='/login'>
                                            <li onClick={() => selected(4)} className={`${style[4] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded`}>Login</li>
                                        </Link>
                                        <Link to='/register'>
                                            <li onClick={() => selected(5)} className={`${style[5] ? 'text-white bg-indigo-600' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-1xl leading-3 shadow-md rounded`}>Register</li>
                                        </Link>

                                    </>
                            }
                        </ul>
                    </div>
                </nav>
                {/* for smaller devcies */}
                <div className="block md:hidden w-full mt-5 ">
                    <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full">
                        <div className="flex space-x-2">
                            <span id="s1" className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}> </span><p id="textClicked" className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer ">{text ? text : "Menu"}</p>
                        </div>
                        <svg id="ArrowSVG" className={`${dropDown ? '' : 'rotate-180'} transform duration-100`} width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className=" relative">
                        <ul id="list" className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md`}>
                            <Link to='/'>
                                <li onClick={() => setSelectedText("Home")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">Home</li>
                            </Link>


                            <Link to='/media'>
                                <li onClick={() => setSelectedText("Media")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">Media</li>
                            </Link>


                            <Link to='/about'>
                                <li onClick={() => setSelectedText("About")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">About</li>
                            </Link>


                            <Link to='/message'>
                                <li onClick={() => setSelectedText("Message")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">Message</li>
                            </Link>

                            {
                                user?.email ? <button className=' px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal'

                                    onClick={handleUserLogout}>LogOut</button> : <>

                                    <Link to='/Login'>
                                        <li onClick={() => setSelectedText("Login")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">Login</li>
                                    </Link>

                                    <Link to='/Register'>
                                        <li onClick={() => setSelectedText("Register")} className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-1xl leading-3 font-normal">Register</li>
                                    </Link>

                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;