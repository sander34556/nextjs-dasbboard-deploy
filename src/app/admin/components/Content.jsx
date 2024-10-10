import React from 'react'
import { FaUser, FaRegNewspaper } from 'react-icons/fa6'

function Content({ totalUsersData,totalPostsData }) {
    return (
        <div className='px-10 rounded-lg'>
            <div className="flex">
                <div className="shadow-lg w-[300] m-3 p-10 rounded-lg">
                    <h3 className='flex items-center'><FaUser className='mr-2' />Total Users</h3>
                    <p className='text-5xl mt-10'>{totalUsersData?.length}</p>
                </div>
                <div className="shadow-lg w-[300] m-3 p-10 rounded-lg">
                    <h3 className='flex items-center'><FaRegNewspaper className='mr-2' />Total Posts</h3>
                    <p className='text-5xl mt-10'>{totalPostsData?.length}</p>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure voluptatem perferendis velit cumque nulla sint! Porro amet magnam soluta doloribus aliquid, minima iusto, earum officia delectus fugiat nostrum rem saepe?</p>
        </div>
    )
}

export default Content