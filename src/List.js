import ListItem from './ListItem'
import { useState } from 'react'
import { useParams } from 'react-router-dom' // https://reactrouter.com/en/main/route/route

export default function List(props) {
  const params = useParams()
  const [newItem, setNewItem] = useState({ text: "", completed: false })
  const [showForm, setShowForm] = useState(false)

  const listIndex = parseInt(params.listIndex)


  function handleInputOnChange(e) {
    setNewItem({ ...newItem, text: e.target.value, completed: false })
  }

  function handleFormOnSubmit(e) {
    e.preventDefault()
    props.createListItem(listIndex, newItem)
    setNewItem({ text: "", completed: false })
    setShowForm(false)
  }


  return (
    <div>
      <h1>{props.lists[listIndex].name}</h1>
      <button>Edit name</button>
      <button>Delete list</button>

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

      {showForm && <form onSubmit={handleFormOnSubmit}>
        <input
          name="text"
          type="text"
          autoFocus="true"
          required="true"
          value={newItem.text}
          onChange={handleInputOnChange}
        />
      </form>}
      <button onClick={() => setShowForm(!showForm)}><img src="/images/plus-circle.svg" /></button>
    </div>
  )
}