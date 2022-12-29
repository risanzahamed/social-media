import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostPage = ({ post }) => {
    const [like, setLike] = useState(50)
    const [disable, setDisable] = React.useState(false);
    const { details } = post
    const info = details?.slice(0, 200);


    const handlelike = () => {
        const addLike = {
            like: like + 1
        }
        fetch('http://localhost:8000/like', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addLike)
        })
            .then(res => res.json())
            .then(result => {
            })
    }

    useEffect(() => {
        fetch("http://localhost:8000/like")
            .then(res => res.json())
            .then(result => {
                setLike(like + 1)
            })
    })


    return (
        <div>
            <div className="flex justify-center">
                <div className="rounded-lg shadow-lg bg-white ">
                    <a href="#!">
                        <img className="rounded-t-lg w-[600px] h-[400px]" src={post.image} alt="" />
                    </a>
                    <div className="p-6">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{post.name}</h5>
                        <p className="text-gray-700 text-base mb-4">
                        </p>
                        {info}... <br />
                        <Link className='cursor-pointer' to={`/post/${post._id}`}><button type="button" className=" inline-block mt-5 cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">See More</button></Link>

                        <div>

                            <p className='mt-6 text-1xl'>Post Total Like {like}</p>
                            <button
                                disabled={disable}
                                onClick={() => setLike(like + 1) || setDisable(true) || handlelike}
                                className=" inline-block mt-5 cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                            >Like</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostPage;