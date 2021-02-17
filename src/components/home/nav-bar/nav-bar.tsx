import React from 'react'
import Logo from './logo'
import NavBarOptions from './nav-bar-options'
import SearchArea from './search-area'

export default function NavBar() {
    return (
        <div className='nav-bar'>
            <Logo />
            <SearchArea />
            <NavBarOptions />
        </div>
    )
}
