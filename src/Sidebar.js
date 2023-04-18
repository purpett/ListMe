import { Link } from "react-router-dom"
import './Sidebar.css'
import AllLists from './AllLists'
import NewListModal from './NewListModal'
import './App.css'


export default function Sidebar(props) {
  return (
    <nav>
      <Link className="homepage" to='/'>LISTME</Link>
      <button className="new-list-button" onClick={props.showModal}>New list</button>
      <AllLists lists={props.lists} />
    </nav>
  )
}