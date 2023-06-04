import React from 'react'
import {useContext} from 'react';
import ThemeContext from '../contexts/theme'
import {NavLink} from 'react-router-dom'



export default function Nav({toggleTheme}) {
    const theme = useContext(ThemeContext)

    return (
        <nav className={`navigation row space-between ${theme}`}>
            <ul className='row nav'>
                <li>
                    <NavLink
                        to='/'
                        className={({isActive}) => "nav-link " + (isActive ? ` active` : "")}>
                        Top
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/new'
                        className={({isActive}) => "nav-link " + (isActive ? ` active` : "")}>
                        New
                    </NavLink>
                </li>
            </ul>
            <button
                style={{fontSize: 30}}
                className='btn-clear'
                onClick={toggleTheme}
            >
                {theme === 'light' ? '🔦' : '💡'}
            </button>
        </nav>
    )
}
