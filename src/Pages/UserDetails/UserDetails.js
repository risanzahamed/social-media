import React from 'react';
import { Link } from 'react-router-dom';

const UserDetails = ({users}) => {
    return (
        <div className='text-2xl mt-10 mb-10'>
            <Link to={`/user/${users._id}`} > <button className='btn btn-primary mb-5 text-left'>Edit Info</button></Link>
            <h2>Name: <span className='text-xl text-red-600'>{users.name}</span></h2>
            <h2>Email: <span className='text-xl text-red-600'>{users.email}</span></h2>
            <h2>Address: <span className='text-xl text-red-600'>{users.address}</span></h2>
            <h2>University: <span className='text-xl text-red-600'>{users.university}</span></h2>
        </div>
    );
};

export default UserDetails;