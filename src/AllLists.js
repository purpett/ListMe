import { NavLink } from "react-router-dom"; //https://reactrouter.com/en/main/components/nav-link
import "./AllLists.css"
import './App.css'


export default function AllLists(props) {
  const listLinks = props.lists.map((item, index) => {
    return (
      <li className="single-link">
        <NavLink className="list-link" to={`/lists/${index}`} item={item} key={index}>{item.name}</NavLink>
      </li>
    )
  });
  return (
    <ul className="sidebar-lists">
      {listLinks}
    </ul>
  )
}