import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import Comment from './Comment';

const FullPostPage = () => {
    const post = useLoaderData()
    const [comment, setComment] = useState()
    const [like, setLike] = useState(50)
    const [disable, setDisable] = React.useState(false);


    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const comment = form.comment.value;
        const postComment = { name, comment }
        fetch('http://localhost:8000/comment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postComment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                form.reset()
            })
    }

    useEffect(() => {
        fetch('http://localhost:8000/comment')
            .then(res => res.json())
            .then(data => {
                setComment(data)

            })
    })



    return (
        <div>
            <div className="flex justify-center p-3 lg:w-[600px] container 2xl:container 2xl:mx-auto mt-7">
                <div className="rounded-lg shadow-lg bg-white lg:w-[600px]">
                    <a href='/'>
                        <img className="rounded-t-lg lg:w-[600px] lg:h-[400px]" src={post.image} alt="" />
                    </a>
                    <div className="p-6">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{post.name}</h5>
                        <p className="text-gray-700 text-base mb-4">
                        </p>
                        {post.details}

                        <p className='mt-6 text-1xl'>Post Total Like {like}</p>
                            <button
                            disabled={disable}
                                onClick={() => setLike(like + 1) ||  setDisable(true)}
                                className=" inline-block mt-5 cursor-pointer px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"

                            >Like</button>
                    </div>
                    <div className="w-full p-5">

                        <form onSubmit={handleComment}>

                            <div className="mb-6">
                                <input
                                    required
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="exampleFormControlInput2"
                                    placeholder="Your Name"
                                    name='name'
                                />
                            </div>

                            <div className="mb-6">
                                <textarea
                                    required
                                    name='comment'
                                    className="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300" placeholder="Christ bless you! . . .">

                                </textarea>
                            </div>

                            <div className="flex justify-end">
                                <button className="rounded-full py-1 px-2 text-white bg-black">Comment</button>
                            </div>
                        </form>
                    </div>
                    {
                        comment?.length ? <div className='text-left p-10 border m-5 '>
                            {
                                comment?.map(comment => <Comment
                                    key={comment._id}
                                    comment={comment}
                                ></Comment>)
                            }
                        </div> : <div className='text-left p-10 border m-5'>

                            <p>No Comment</p>
                        </div>
                    }
                </div>


            </div>
        </div>
    );
};

export default FullPostPage;