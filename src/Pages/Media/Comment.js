import React from 'react';

const Comment = ({comment}) => {
    return (
        <div>
            <div className='border p-4 m-5'>
                <h2> <span className='font-bold'>User Name:</span> {comment.name}</h2>
                <h2><span className='font-bold'>Comment:</span> {comment.comment}</h2>
            </div>
        </div>
    );
};

export default Comment;