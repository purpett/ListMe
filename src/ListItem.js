
export default function ListItem(props) {
  return (
    <div>
      <li>
        {props.item.text}
        <button><img src="/images/check.svg" /></button>
        <button><img src="/images/trash-can-outline.svg" alt="trash can outline" /></button>
      </li>
    </div>
  )
}