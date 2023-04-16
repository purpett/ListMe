import ListItem from './ListItem'
export default function List() {

  return (
    <div>
      <span><h1>Your list name here</h1></span>
      <button>Edit name</button>

      <button>Delete list</button>
      <button>Remove completed items</button>

      <div>List category: category</div>
      <ul>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </ul>

      <button><img src="/images/plus-circle.svg" /></button>
    </div>
  )

}
