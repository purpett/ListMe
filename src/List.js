import ListItem from './ListItem'
import { useState, useEffect, useContext } from 'react'
// https://reactrouter.com/en/main/route/route for useParams
// https://reactrouter.com/en/main/hooks/use-navigate
import { useParams, useNavigate } from 'react-router-dom'
import './List.css'
import './App.css'
import { AppContext } from './Context'




export default function List(props) {
  // destructuring as per react Context
  const { lists, createListItem, deleteAllItems, deleteCompletedItems } = useContext(AppContext);

  // params to read list index from the path
  const params = useParams()

  // state for new list item
  const [newItem, setNewItem] = useState({ text: "", completed: false })

  // eventually found out that list index was a string
  const listIndex = parseInt(params.listIndex)

  // state for edited list name
  const [newListName, setNewListName] = useState(lists[listIndex])

  // state for opening and closing the form to edit the list name 
  const [showFormListName, setShowFormListName] = useState(false)

  // redirecting to home page when list gets deleted
  const navigate = useNavigate()
  useEffect(() => {
    if (!lists[listIndex]) {
      navigate("/")
    }
  })

  // prevents the first render when useEffect is trying to redirect to homepage
  if (!lists[listIndex]) {
    return
  }

  // this fixes many form-related bugs. When the input is showing but is not selected, the form closes
  function handleBlur() {
    setShowFormListName(false)
  }

  // allows to close the form with 'esc' key
  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowFormListName(false)
    }
  }

  // updates local state of item to receive the content of the input
  function handleInputOnChange(e) {
    setNewItem({ ...newItem, text: e.target.value, completed: false })
  }

  // effectively creates list item when pressing enter
  function handleItemFormOnSubmit(e) {
    e.preventDefault()
    createListItem(listIndex, newItem)
    setNewItem({ text: "", completed: false })
  }

  // updates local state of list name to receive content of input
  function handleNewNameInputOnChange(e) {
    setNewListName({ ...newListName, name: e.target.value })
  }

  // effectively changes the name of the list
  function handleNameFormOnSubmit(e) {
    e.preventDefault()
    props.editListName(newListName.name, listIndex)
    setShowFormListName(false)
  }

  // opens/closes the forms
  function enableForm() {
    setNewListName(lists[listIndex])
    setShowFormListName(!showFormListName)
  }

  return (
    <div className='List'>
      <div className='header'>
        <div className='header-left'>
          {/* if the form is closed, show the title */}
          {!showFormListName && <h1>{lists[listIndex].name}</h1>}
          {/* if the form is closed, show the category */}
          {!showFormListName && lists[listIndex].category && <div className='category'>
            <span>&nbsp; | &nbsp;</span> {lists[listIndex].category}
          </div>}
          {/* if the form is open, show the form to change the list name */}
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
        <button className='danger dark-btn' onClick={() => deleteAllItems(listIndex)}>Remove all items</button>
        <button className='warning dark-btn' onClick={() => deleteCompletedItems(listIndex)}>Remove checked items</button>
      </div>

      <div className='list-content'>
        <ul>
          {lists[listIndex].items.map((item, index) =>
            <ListItem
              item={item}
              key={index}
              itemIndex={index}
              listIndex={listIndex}
            />)}
        </ul>

        {/* form to create new item. Always open */}
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