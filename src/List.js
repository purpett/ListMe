import ListItem from './ListItem'
import { useState } from 'react'
// https://reactrouter.com/en/main/route/route
// https://reactrouter.com/en/main/hooks/use-navigate
import { useParams, useNavigate } from 'react-router-dom'


export default function List(props) {
  const params = useParams()
  const [newItem, setNewItem] = useState({ text: "", completed: false })
  const [showFormAddItem, setShowFormAddItem] = useState(false)
  const listIndex = parseInt(params.listIndex)
  const [newListName, setNewListName] = useState(props.lists[listIndex])
  const [showFormListName, setShowFormListName] = useState(false)
  const navigate = useNavigate()


  function handleInputOnChange(e) {
    setNewItem({ ...newItem, text: e.target.value, completed: false })
  }

  function handleItemFormOnSubmit(e) {
    e.preventDefault()
    props.createListItem(listIndex, newItem)
    setNewItem({ text: "", completed: false })
    setShowFormAddItem(false)
  }

  function handleNewNameInputOnChange(e) {
    setNewListName({ ...newListName, name: e.target.value })
  }

  function handleNameFormOnSubmit(e) {
    e.preventDefault()
    props.editListName(newListName.name, listIndex)
    setNewListName({ name: "" })
    setShowFormListName(false)
  }

  function handleEscForm(e) {
    if (e.keyCode == 27) {
      setShowFormListName(false)
      setShowFormAddItem(false)
    }
  }

  return (
    <div>
      {!showFormListName && <h1>{props.lists[listIndex].name}</h1>}
      {showFormListName && <form onSubmit={handleNameFormOnSubmit}>
        <input
          name="name"
          type="text"
          autoFocus="true"
          required="true"
          value={newListName.name}
          onChange={handleNewNameInputOnChange}
          onKeyDown={handleEscForm}
        />

      </form>}

      <button onClick={() => setShowFormListName(!showFormListName)}>Edit name</button>
      <button onClick={() => { props.deleteList(listIndex); navigate("/") }}>Delete list</button>

      <button onClick={() => props.deleteAllItems(listIndex)}>Remove all items</button>
      <button onClick={() => props.deleteCompletedItems(listIndex)}>Remove completed items</button>

      <div>List category: {props.lists[listIndex].category}
      </div>

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

      {showFormAddItem && <form onSubmit={handleItemFormOnSubmit}>
        <input
          name="text"
          type="text"
          autoFocus="true"
          required="true"
          value={newItem.text}
          onChange={handleInputOnChange}
          onKeyDown={handleEscForm}
        />
      </form>}
      <button onClick={() => setShowFormAddItem(!showFormAddItem)}><img src="/images/plus-circle.svg" /></button>
    </div>
  )
}