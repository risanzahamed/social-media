import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import PostPage from './PostPage';

const Media = () => {
    const [posts, setPosts] = useState()

    useEffect(()=>{
        fetch('http://localhost:8000/posts')
        .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    })

    return (
        <div className='2xl:container 2xl:mx-auto mt-7'>
            <h3 className='text-4xl mb-10'>Total {posts?.length} Media</h3>

            <div className='grid lg:grid-cols-3 p-2 gap-5'>
            {
                posts?.map(post => <PostPage
                key={post._id}
                post={post}
                ></PostPage>)
            }
            </div>
        </div>
    );
};

export default Media;