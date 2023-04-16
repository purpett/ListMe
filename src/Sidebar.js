import { Link } from "react-router-dom"
import './Sidebar.css'

export default function Sidebar() {
  return (
    <nav>
      <Link to='/'>Homepage</Link>
      <ul>
        <li>List 1</li>
        <li>List 2</li>
        <li>List 3</li>
      </ul>
    </nav>
  )
}