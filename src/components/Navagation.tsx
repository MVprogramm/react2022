import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="
            flex
            fixed
            w-screen
            top-0
            z-10
            justify-between
            items-center
            h-[50px]
            px-5
            shadow-md
            bg-gray-500
            text-white
        " >
            <h3 className='font-bold'>Github Search</h3>

            <span>
                <Link to='/' className='mr-2'>Home</Link>
                <Link to='/favourites'>Favourites</Link>
            </span>

        </nav>
    )
}

export default Navigation