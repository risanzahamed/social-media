import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className='flex justify-center align-middle h-full w-full'>
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
            </div>
        </div>
    );
};

export default Loading;