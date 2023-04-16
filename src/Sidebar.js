import { Link } from "react-router-dom"
import './Sidebar.css'
import AllLists from './AllLists'

export default function Sidebar() {
  return (
    <nav>
      <Link to='/'>Homepage</Link>
      <button className="new-list">Create list</button>
      <AllLists />
    </nav>
  )
}