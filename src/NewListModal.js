export default function NewListModal() {
  return (
    <div>
      <label>Name of your list:</label>
      <input type="text" placeholder="Type here..." />

      <label>Category</label>
      <select>
        <option>Select category:</option>
        <option>Movies</option>
        <option>Books</option>
        <option>Music</option>
        <option>Recipes</option>
        <option>Other</option>
      </select>
      <button>Create list</button>
    </div>
  )
}