import { useState, useContext } from 'react'
import './App.css'
import './ListItem.css'
import { AppContext } from './Context'

export default function ListItem(props) {

  const [editedItem, setEditedItem] = useState({ text: props.item.text, completed: false })
  const [showForm, setShowForm] = useState(false)

  const { editListItem, deleteListItem, toggleItem } = useContext(AppContext);

  function handleInputOnChange(e) {
    setEditedItem({ ...editedItem, text: e.target.value, completed: false })
  }

  function handleFormOnSubmit(e) {
    e.preventDefault()
    editListItem(editedItem.text, props.listIndex, props.itemIndex)
    setShowForm(false)
  }

  function handleBlur() {
    setShowForm(false)
  }

  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowForm()
    }
  }

  function enableForm() {
    setEditedItem({ text: props.item.text, completed: false })
    setShowForm(!showForm)
  }

  return (
    <li className='list-item'>
      <div>
        <label>
          <input
            type="checkbox"
            className='checkbox'
            checked={props.item.completed}
            onChange={() => toggleItem(props.listIndex, props.itemIndex)}
          />
        </label>
        {!showForm && <span
          className={`${props.item.completed ? 'completed' : ''} item-text`}
          onClick={enableForm}>
          {props.item.text}
        </span>}
        {showForm && <form onSubmit={handleFormOnSubmit} className="edit-item-form">
          <input
            name="text"
            type="text"
            placeholder={props.item.text}
            autoFocus="true"
            autoComplete='off'
            required="true"
            value={editedItem.text}
            onChange={handleInputOnChange}
            onKeyDown={handleEscForm}
            onBlur={handleBlur}
            className='item-input'
          />
        </form>}
        <div className="trash-container">
          {!showForm && <img className="hidden delete-btn" src="/images/trash-can-outline.svg" alt="trash can outline" onClick={() => deleteListItem(props.listIndex, props.itemIndex)} />}
        </div>
      </div>
    </li>
  )
}