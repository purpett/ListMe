import { NavLink } from "react-router-dom"; //https://reactrouter.com/en/main/components/nav-link


export default function AllLists(props) {
  const listLinks = props.lists.map((item, index) => {
    return <NavLink to={`/lists/${index}`} item={item} key={index}>{item.name}</NavLink>;
  });
  return (
    <ul className="List">
      {listLinks}
    </ul>
  )
}