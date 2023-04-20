import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import "./NewListModal.css"
import './App.css'


export default function NewListModal(props) {
  // state for the name and category of a new list
  const [newListInfo, setNewListInfo] = useState({ name: "", category: "", items: [] })

  // to redirect to the newly created list when form is submitted
  const navigate = useNavigate()

  // updates local state of list info to receive content of input
  function handleOnChange(e) {
    setNewListInfo({ ...newListInfo, [e.target.name]: e.target.value })
  }

  // gets promise from chosen api, creates a list with the given information and 5 items
  // resets the form and redirects
  function onSubmit(e) {
    e.preventDefault()

    props.getItemsFromAPI(newListInfo.category).then(items => {
      props.createList({ ...newListInfo, items: items })
      props.onClose()
      setNewListInfo({ name: "", category: "", items: [] })
      navigate(`/lists/${props.lists.length}`)
    })
  }

  return (
    // https://reactcommunity.org/react-modal/ for react-modal documentation
    <ReactModal
      isOpen={props.isOpen}
      contentLabel='Form to decide list name and category'
      shouldCloseOnEsc={true}
      onRequestClose={props.onClose}
      className="modal"
    >
      <form className='modal-content' onSubmit={onSubmit}>
        <div className='list-name-form'>
          <label>Name of your list:</label>
          <input
            type="text"
            placeholder="Type here..."
            autoComplete='off'
            required
            name="name"
            value={newListInfo.name}
            onChange={handleOnChange}
          />
        </div>
        <div className='list-category-form'>
          <label>Category:</label>
          <div>
            <select
              name="category"
              id="list-category"
              value={newListInfo.category}
              onChange={handleOnChange}
              required
            >
              <option value="">Select category:</option>
              <option>Movies</option>
              <option>Books</option>
              <option>Recipes</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <button type="submit">Create list</button>
      </form>
    </ReactModal >
  )
}

