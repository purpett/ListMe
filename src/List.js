import ListItem from './ListItem'
import { useState, useEffect } from 'react'
// https://reactrouter.com/en/main/route/route
// https://reactrouter.com/en/main/hooks/use-navigate
import { useParams, useNavigate } from 'react-router-dom'
import './List.css'
import './App.css'



export default function List(props) {
  const params = useParams()
  const [newItem, setNewItem] = useState({ text: "", completed: false })
  const listIndex = parseInt(params.listIndex)
  const [newListName, setNewListName] = useState(props.lists[listIndex])
  const [showFormListName, setShowFormListName] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.lists[listIndex]) {
      navigate("/")
    }
  })

  function handleBlur() {
    setShowFormListName(false)
  }

  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowFormListName(false)
    }
  }

  if (!props.lists[listIndex]) {
    return
  }

  function handleInputOnChange(e) {
    setNewItem({ ...newItem, text: e.target.value, completed: false })
  }

  function handleItemFormOnSubmit(e) {
    e.preventDefault()
    props.createListItem(listIndex, newItem)
    setNewItem({ text: "", completed: false })
  }

  function handleNewNameInputOnChange(e) {
    setNewListName({ ...newListName, name: e.target.value })
  }

  function handleNameFormOnSubmit(e) {
    e.preventDefault()
    props.editListName(newListName.name, listIndex)
    setShowFormListName(false)
  }

  function enableForm() {
    setNewListName(props.lists[listIndex])
    setShowFormListName(!showFormListName)
  }

  return (
    <div className='List'>
      <div className='header'>
        <div className='header-left'>
          {!showFormListName && <h1>{props.lists[listIndex].name}</h1>}
          {!showFormListName && props.lists[listIndex].category && <div className='category'>
            <span>&nbsp; | &nbsp;</span> {props.lists[listIndex].category}
          </div>}
          {showFormListName && (
            <form onSubmit={handleNameFormOnSubmit} className="inline-form">
              <input
                name="name"
                type="text"
                autoFocus="true"
                autoComplete='off'
                required="true"
                value={newListName.name}
                onChange={handleNewNameInputOnChange}
                onKeyDown={handleEscForm}
                onBlur={handleBlur}
                id='edit-form-input'
              />
            </form>
          )}
          <img className="edit-btn" onClick={enableForm} src="/images/pencil-outline.svg" alt="pencil outline" />
          <hr />
        </div>
      </div>
      <div className='danger-zone'>
        <button className='danger dark-btn' onClick={() => { props.deleteList(listIndex); navigate("/") }}>Delete list</button>
        <button className='danger dark-btn' onClick={() => props.deleteAllItems(listIndex)}>Remove all items</button>
        <button className='warning dark-btn' onClick={() => props.deleteCompletedItems(listIndex)}>Remove checked items</button>
      </div>

      <div className='list-content'>
        <ul>
          {props.lists[listIndex].items.map((item, index) =>
            <ListItem
              item={item}
              key={index}
              itemIndex={index}
              toggleItem={props.toggleItem}
              listIndex={listIndex}
              deleteListItem={props.deleteListItem}
              editListItem={props.editListItem}
            />)}
        </ul>

        <form onSubmit={handleItemFormOnSubmit}>
          <input
            name="text"
            type="text"
            autoFocus="true"
            placeholder='Type here to add...'
            autoComplete='off'
            required="true"
            value={newItem.text}
            onChange={handleInputOnChange}
            onKeyDown={handleEscForm}
            className='item-input'
            id='add'
          />
        </form>
      </div>
    </div>
  )
}