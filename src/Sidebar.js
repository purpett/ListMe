import { Link } from "react-router-dom"
import './Sidebar.css'
import AllLists from './AllLists'
import NewListModal from './NewListModal'

export default function Sidebar(props) {
  return (
    <nav>
      <Link to='/'>Homepage</Link>
      <button className="new-list" onClick={props.showModal}>New list</button>
      <AllLists lists={props.lists} />
    </nav>
  )
}