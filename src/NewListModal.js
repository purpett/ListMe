import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom'


export default function NewListModal(props) {
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
        <input type="text" placeholder="Type here..." />

        <label>Category</label>
        <select>
          <option>Select category:</option>
          <option>Movies</option>
          <option>Books</option>
          <option>Music</option>
          <option>Recipes</option>
          <option>Other</option>
        </select>
        <button>Create list</button>
      </div>
    </ReactModal>
  )
}