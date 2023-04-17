import { useParams } from 'react-router-dom'

export default function ListItem(props) {

  return (
    <div>
      <li>
        {props.item.text}
        <button onClick={() => props.toggleItem(props.listIndex, props.itemIndex)}><img src="/images/check.svg" /></button>
        <button><img src="/images/trash-can-outline.svg" alt="trash can outline" /></button>
      </li>
    </div>
  )
}