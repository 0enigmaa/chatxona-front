import React from 'react'
import './Search.css'
import Users from '../Users/Users'
import Logo from '../../images/logo.png'


const Search = ({ modal, setModal }) => {
    return (
        <div className='search-user'>
            <div className="search-box">
                <a href="/">

                    <img width={40} src="https://w7.pngwing.com/pngs/172/650/png-transparent-facebook-messenger-hd-logo-thumbnail.png" alt="logo" className="logo-img" />

                </a>
                <input type="text" className="search-input form-control" placeholder='Search' />
            </div>


            <h1>All Users</h1>

            <Users modal={modal} setModal={setModal} />
        </div>
    )
}

export default Search
