import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useForm } from 'react-hook-form';
import PostPage from '../Media/PostPage';
import toast from 'react-hot-toast';
const Home = () => {
    const { user } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const imageHostKey = process.env.REACT_APP_IMGBB_KEY
    const handleAddProduct = data => {
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`


        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {

                if (imageData.success) {
                    const addPost = {
                        name: data.postName,
                        details: data.details,
                        image: imageData.data.url,
                    }
                    fetch('https://social-media-server-six.vercel.app/posts', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addPost)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success('Post Added')
                            navigate('/media')
                        })
                }
            })


    }


    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch('https://social-media-server-six.vercel.app/home/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            })
    })

    return (
        <div className='2xl:container 2xl:mx-auto mt-7'>
            {
                user?.uid ? <>

                    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
                        <div className="px-4  sm:px-6 lg:px-8">
                            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                                <div>
                                    <form className='lg:w-[520px]' onSubmit={handleSubmit(handleAddProduct)}>
                                        <h1 className='text-4xl'>Upload Your Post</h1>
                                        <div className="mb-6 mt-6">
                                            <input
                                                required
                                                {...register("postName")}
                                                type="text"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                id="exampleFormControlInput2"
                                                placeholder="Post Title"

                                            />
                                        </div>

                                        <div className="mb-6">

                                            <textarea
                                                required
                                                {...register("details")}
                                                type="text"
                                                rows="7"
                                                placeholder="Post Description"
                                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                cols='80'></textarea>
                                        </div>


                                        <div className="mb-6">
                                            <label
                                                className="text-xl mb-10 text-gray-600 "
                                                htmlFor="text">
                                                Upload Image</label>
                                            <input
                                                {...register("image")}
                                                type="file"

                                                className="form-control block mt-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                required />
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <input type="submit" value="Upload Post"
                                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer "
                                            />
                                        </div>





                                    </form>
                                </div>
                                <div>
                                    <img className="lg:w-[600px] justify-end items-end lg:ml-11" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className='text-4xl p-5'>Feature Post</h2>
                        <div className='grid lg:grid-cols-3 p-2 gap-5'>
                            {
                                posts?.map(post => <PostPage
                                    key={post._id}
                                    post={post}
                                ></PostPage>)
                            }
                        </div>
                    </section>
                </>
                    :
                    <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
                        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                                <div>
                                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A social media for learners</p>
                                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-5xl">First Login / Register </h1>
                                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl"> And Enjoy Full Feature of the Website.</p>

                                    <Link to="/register" title="" className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full lg:mt-16 hover:bg-slate-700 hover:text-white focus:bg-yellow-400" role="button">
                                        Join for free
                                        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </Link>

                                    <p className="mt-5 text-gray-600">Already joined us? <Link to="/login" title="" className="text-black transition-all duration-200 hover:underline">Log in</Link></p>
                                </div>

                                <div>
                                    <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
            }


        </div>
    );
};

export default Home;