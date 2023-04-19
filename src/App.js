import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import List from './List';
import PageNotFound from './PageNotFound'
import './App.css';
import NewListModal from './NewListModal';

function App() {

  // type of lists: 
  // [
  //   // A single list object
  //   {
  //     name: "string", => list name
  //     category: "string", => list category
  //     items: [
  //       // An item within a list
  //       {
  //         text: "string",
  //         completed: false,
  //       }
  //     ]
  //   }
  // ]


  const [lists, setLists] = useState([])
  const [showNewListModal, setShowNewListModal] = useState(false);


  function createList(newList) {
    setLists([...lists, newList])
  }

  function editListName(newName, listIndex) {
    const updatedLists = lists.map((list, i) => {
      if (i === listIndex) {
        return { name: newName, items: list.items }
      }
      return list
    })

    setLists(updatedLists)
  }

  function deleteList(listIndex) {
    const updatedLists = lists.filter((list, index) => {
      return index !== listIndex
    })
    setLists(updatedLists)
  }

  function createListItem(listIndex, newItem) {
    const updatedItems = [...lists[listIndex].items, newItem]
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }

  function createListItemsFromArray(listIndex, newItemsArray) {
    const updatedItems = [...lists[listIndex].items, ...newItemsArray]
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }

  function editListItem(newText, listIndex, itemIndex) {
    const updatedItems = lists[listIndex].items.map((item, indx) => {
      if (indx === itemIndex) {
        return { text: newText, completed: item.completed }
      }
      return item
    })
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }

  function deleteListItem(listIndex, itemIndex) {
    const updatedItems = lists[listIndex].items.filter((item, index) => index !== itemIndex)
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }

  function deleteAllItems(listIndex) {
    updateList(listIndex, { name: lists[listIndex].name, items: [] })
  }

  function deleteCompletedItems(listIndex) {
    const updatedItems = lists[listIndex].items.filter((item) => !item.completed)
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }

  function updateList(listIndex, newList) {
    const updatedLists = lists.map((list, i) => {
      if (i === listIndex) {
        return newList
      }
      return list
    })
    setLists(updatedLists)
  }

  // function to flag item (tick, untick)

  function toggleItem(listIndex, itemIndex) {
    const updatedItems = lists[listIndex].items.map((item, indx) => {
      if (indx === itemIndex) {
        return { text: item.text, completed: !item.completed }
      }
      return item
    })
    updateList(listIndex, { name: lists[listIndex].name, items: updatedItems })
  }


  // mixes the items of an array and selects the first 5 (times)
  function getRandomItems(array, times = 5) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, times)
  }

  function getItemsFromBooksAPI() {
    return fetch("https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=kPxbWK56GBd1bymOqb49e4KDiwbdAZUd")
      .then((response) => response.json())
      .then((results) => {
        const selectedItems = getRandomItems(results.results)
        const titles = selectedItems.map((item) => `${item.title}, by ${item.author}`)
        return titles.map((title) => ({ text: title, completed: false }))
      })
      .catch((error) => console.log("ERROR", error))
  }

  function getItemsFromMoviesAPI() {

  }

  function getItemsFromRecipesAPI() {

  }

  function getItemsFromAPI(category) {
    console.log(category)
    if (category === 'Movies') {
      return getItemsFromMoviesAPI()
    } else if (category === 'Books') {
      return getItemsFromBooksAPI()
    } else if (category === 'Recipes') {
      return getItemsFromRecipesAPI()
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
      return Promise.resolve([])
    }
  }

  return (
    <div className="App">
      <Sidebar showModal={() => setShowNewListModal(true)} lists={lists} />
      <Routes>
        <Route path="/" element={<Homepage showModal={() => setShowNewListModal(true)} />} />
        <Route
          path="/lists/:listIndex"
          element={<List
            lists={lists}
            createListItem={createListItem}
            editListName={editListName}
            deleteList={deleteList}
            editListItem={editListItem}
            deleteListItem={deleteListItem}
            deleteAllItems={deleteAllItems}
            deleteCompletedItems={deleteCompletedItems}
            toggleItem={toggleItem}
          />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <NewListModal lists={lists} isOpen={showNewListModal} onClose={() => setShowNewListModal(false)} createList={createList} getItemsFromAPI={getItemsFromAPI} />
    </div>
  );
}

export default App;
