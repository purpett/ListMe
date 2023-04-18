import { useState } from 'react'
import './App.css'
import './ListItem.css'

export default function ListItem(props) {
  const [editedItem, setEditedItem] = useState({ text: props.item.text, completed: false })
  const [showForm, setShowForm] = useState(false)

  function handleInputOnChange(e) {
    setEditedItem({ ...editedItem, text: e.target.value, completed: false })
  }

  function handleFormOnSubmit(e) {
    e.preventDefault()
    props.editListItem(editedItem.text, props.listIndex, props.itemIndex)
    setShowForm(false)
  }

  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowForm()
    }
  }

  return (
    <li className='list-item'>
      <div>
        <input
          type="checkbox"
          checked={props.item.completed}
          onChange={() => props.toggleItem(props.listIndex, props.itemIndex)}
        />
        <span onClick={() => setShowForm(!showForm)}>{!showForm && props.item.text}</span>
        {showForm && <form onSubmit={handleFormOnSubmit} className='inline-form'>
          <input
            name="text"
            type="text"
            placeholder={props.item.text}
            autoFocus="true"
            required="true"
            value={editedItem.text}
            onChange={handleInputOnChange}
            onKeyDown={handleEscForm}
            id='edit-item-input'
          />
        </form>}
        {/* {!showForm && <button onClick={() => props.toggleItem(props.listIndex, props.itemIndex)}><img src="/images/check.svg" /></button>}
          {!showForm && <button onClick={() => props.deleteListItem(props.listIndex, props.itemIndex)}><img src="/images/trash-can-outline.svg" alt="trash can outline" /></button>} */}
      </div>
    </li>
  )
}