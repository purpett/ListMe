import { useState, useContext } from 'react'
import './App.css'
import './ListItem.css'
import { AppContext } from './Context'

export default function ListItem(props) {

  // state for edited items
  const [editedItem, setEditedItem] = useState({ text: props.item.text, completed: false })

  // state for opening and closing the form to edit the list item 
  const [showForm, setShowForm] = useState(false)

  // destructuring as per react Context to pass item related functions
  const { editListItem, deleteListItem, toggleItem } = useContext(AppContext);

  // updates local state of edited item to receive the content of the input
  function handleInputOnChange(e) {
    setEditedItem({ ...editedItem, text: e.target.value, completed: false })
  }

  // effectively edits the item (form submitted)
  function handleFormOnSubmit(e) {
    e.preventDefault()
    editListItem(editedItem.text, props.listIndex, props.itemIndex)
    setShowForm(false)
  }

  // this fixes many form-related bugs. When the input is showing but is not selected, the form closes
  function handleBlur() {
    setShowForm(false)
  }

  // allows to close the form with 'esc' key
  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowForm()
    }
  }

  // opens/closes the forms
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
        {/* if form is closed, show item text */}
        {!showForm && <span
          // gives class name depending on completed state. Used for crossed item style
          className={`${props.item.completed ? 'completed' : ''} item-text`}
          onClick={enableForm}>
          {props.item.text}
        </span>}
        {/* if form is open, show form to to edit the item */}
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
          {/* if the form is closed, show the delete item button (bin) */}
          {!showForm && <img className="hidden delete-btn" src="/images/trash-can-outline.svg" alt="trash can outline" onClick={() => deleteListItem(props.listIndex, props.itemIndex)} />}
        </div>
      </div>
    </li>
  )
}