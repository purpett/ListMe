import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import NewListModal from './NewListModal'

export default function Homepage(props) {


  return (
    <div>
      <h1>Welcome to ListMe</h1>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>

      <button onClick={props.showModal}>New list</button>

      <div className='placeholder'>
        <img src="" alt="UI preview"></img>
      </div>


    </div>
  )
}