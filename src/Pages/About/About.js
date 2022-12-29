import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import FullPostPage from '../Media/FullPostPage';
import UserDetails from '../UserDetails/UserDetails';

const About = () => {

    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState()

    useEffect(() => {
        fetch(`https://social-media-server-six.vercel.app/user?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })
    }, [])

    return (
        <div className='2xl:container 2xl:mx-auto mt-7 md:p-10 sm:p-10 xl:p-10 lg:p-10 2xl:p-0 p-10'>

            <div>
                <h2 className='text-4xl'>About Info</h2>
                {
                    userData && userData?.map(users => <UserDetails
                        key={users._id}
                        users={users}
                    ></UserDetails>)
                }
            </div>
            
        </div>
    );
};

export default About;