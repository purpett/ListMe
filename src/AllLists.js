import { Link } from "react-router-dom";


export default function AllLists(props) {
  const listLinks = props.lists.map((item, index) => {
    return <Link to={`/lists/${index}`} item={item} key={index}>{item.name}</Link>;
  });
  return (
    <ul className="List">
      {listLinks}
    </ul>
  )
}