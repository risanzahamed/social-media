import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UpdateUser = () => {

    const data = useLoaderData();
    const [updatedUser, setUpdatedUser] = useState(data);
    const navigate = useNavigate()

    const handleUpdateUserInfo = event => {
        event.preventDefault();
     
        fetch(`https://social-media-server-six.vercel.app/users/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('user updated')
                    navigate('/about')

                }

            })
    }

    const handleDataChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...updatedUser }
        newUser[field] = value;
        setUpdatedUser(newUser);
    }


    return (
        <div className='2xl:container 2xl:mx-auto mt-7 md:p-10 sm:p-10 xl:p-10 lg:p-10 2xl:p-0 p-10'>
            <h2 className='text-4xl'>Update Info:</h2>

            
            <form className='lg:w-[700px]' onSubmit={handleUpdateUserInfo}>

                <div className="mb-6 mt-6">
                    <input
                        onChange={handleDataChange}
                        defaultValue={data.name}
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Your Name"
                        name='name'
                    />
                </div>

                <div className="mb-6">
                    <input
                        onChange={handleDataChange}
                        defaultValue={data.university}
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Your University"
                        name='university'
                    />
                </div>

                <div className="mb-6">
                    <input
                        onChange={handleDataChange}
                        defaultValue={data.address}
                        type="text"
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Address"
                        name='address'
                    />
                </div>

                <div className="mb-6">
                    <input
                        onChange={handleDataChange}
                        defaultValue={data.email}
                        type="email"
                        readOnly
                        disabled
                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        name='email'
                    />
                </div>

                <div className="text-center lg:text-left">
                    <input type="submit" value="Update"
                        className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer "
                    />
                    <Link to='/about'>
                    <button className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer ml-10">Go back</button>
                    </Link>
                </div>

                <h2 className='text-xl text-red-600 mt-6'>Note : Email Not editable</h2>
            </form>
            
        </div>
    );
};

export default UpdateUser;