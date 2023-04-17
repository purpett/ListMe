import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


export default function NewListModal(props) {
  const [newListInfo, setNewListInfo] = useState({ name: "", category: "" })

  function handleOnChange(e) {
    setNewListInfo({ ...newListInfo, [e.target.name]: e.target.value })
  }

  function onSubmit() {
    props.createList(newListInfo)
    props.onClose()
    setNewListInfo({ name: "", category: "" })
  }

  return (
    // https://reactcommunity.org/react-modal/ for react-modal documentation
    <ReactModal
      isOpen={props.isOpen}
      contentLabel='Form to decide list name and category'
      shouldCloseOnEsc={true}
      onRequestClose={props.onClose}
    >
      <div>
        <label>Name of your list:</label>
        <input
          type="text"
          placeholder="Type here..."
          name="name"
          value={newListInfo.name}
          onChange={handleOnChange}
        />

        <label>Category</label>
        <select
          name="category"
          id="list-category"
          value={newListInfo.category}
          onChange={handleOnChange}
        >
          <option>Select category:</option>
          <option>Movies</option>
          <option>Books</option>
          <option>Recipes</option>
          <option>Other</option>
        </select>
        <button onClick={onSubmit} >Create list</button>
      </div>
    </ReactModal>
  )
}

