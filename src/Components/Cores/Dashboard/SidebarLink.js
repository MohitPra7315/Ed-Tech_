import React from 'react'

import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


const SidebarLink = ({ link }) => {


    const location = useLocation()

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }



    return (

        <NavLink
            to={link.path}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)? "bg-yellow-800 text-yellow-100 " : "bg-opacity-0"}`}
        >

            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50
        ${matchRoute(link.path) ? "opacity-100" : "opactity-0"}`}>

            </span>

            <div className='flex item-center gap-x-2'>

                <iconName></iconName>
                <span>{link.name}</span>
            </div>
        </NavLink>

    )
}

export default SidebarLink