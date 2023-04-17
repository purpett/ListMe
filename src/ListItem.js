import { useState } from 'react'

export default function ListItem(props) {
  const [newItem, setNewItem] = useState({ text: props.item.text, completed: false })
  const [showForm, setShowForm] = useState(false)

  function handleInputOnChange(e) {
    setNewItem({ ...newItem, text: e.target.value, completed: false })
  }

  function handleFormOnSubmit(e) {
    e.preventDefault()
    props.editListItem(newItem.text, props.listIndex, props.itemIndex)
    setNewItem({ text: "", completed: false })
    setShowForm(false)
  }

  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowForm()
    }
  }

  return (
    <div>
      <li>
        <span onClick={() => setShowForm(!showForm)}>{!showForm && props.item.text}</span>
        {showForm && <form onSubmit={handleFormOnSubmit}>
          <input
            name="text"
            type="text"
            placeholder={props.item.text}
            autoFocus="true"
            required="true"
            value={newItem.text}
            onChange={handleInputOnChange}
            onKeyDown={handleEscForm}
          />
        </form>}
        {!showForm && <button onClick={() => props.toggleItem(props.listIndex, props.itemIndex)}><img src="/images/check.svg" /></button>}
        {!showForm && <button onClick={() => props.deleteListItem(props.listIndex, props.itemIndex)}><img src="/images/trash-can-outline.svg" alt="trash can outline" /></button>}
      </li>
    </div>
  )
}