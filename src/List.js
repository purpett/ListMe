import ListItem from './ListItem'
import { useParams } from 'react-router-dom' // https://reactrouter.com/en/main/route/route

export default function List(props) {
  const params = useParams()
  return (
    <div>
      <h1>{props.lists[parseInt(params.listIndex)].name}</h1>
      <button>Edit name</button>

      <button>Delete list</button>
      <button>Remove completed items</button>

      <div>List category: {props.lists[parseInt(params.listIndex)].category}
      </div>

      <button><img src="/images/plus-circle.svg" /></button>
    </div>
  )

}
