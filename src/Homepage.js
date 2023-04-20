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
      <div className='description'>Keep track of your tasks, interests, and reminders with ListMe. Our app comes with pre-populated suggestions when the list is created with a category. You can easily add, edit, and delete items as you need. With the ability to create and edit multiple lists, you'll never forget a thing. Stay organized with our list-making tool!</div>
      <hr />
      <p className='new-list'><button className='dark-btn' onClick={props.showModal}>New list</button></p>

      <p className="how-to">How to:</p>
      <div className="preview">
        <video controls loop>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  )
}