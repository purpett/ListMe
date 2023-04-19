import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Homepage.css'
import NewListModal from './NewListModal'
import './App.css'


export default function Homepage(props) {


  return (
    <div className='Homepage'>
      <div>
        <p className='welcome-to'>Welcome to</p>
        <h1>LISTME</h1>
      </div>
      <hr />
      <div className='description'>Keep track of all your tasks, interests, and reminders with ListMe. Our app comes with pre-populated suggestions to get you started, but you can easily add, edit, and delete items as you need. With the ability to create and edit multiple lists, you'll never forget a thing. Stay organized with our list-making tool!</div>
      <hr />
      <p className='new-list'><button className='dark-btn' onClick={props.showModal}>New list</button></p>

      <div className='placeholder'>
        <img src="" alt="UI preview"></img>
      </div>

    </div>
  )
}