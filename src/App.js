import logo from './logo.svg';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Sidebar from './Sidebar';
import Homepage from './Homepage';
import List from './List';
import PageNotFound from './PageNotFound'
import './App.css';
import NewListModal from './NewListModal';
import { AppContext } from './Context';

function App() {

  // structure of lists: 
  // [
  //   // A single list
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


  const [lists, setLists] = useState(loadState())
  const [showNewListModal, setShowNewListModal] = useState(false);
  const [navIsOpen, setNavIsOpen] = useState(false)

  function storeState() {
    localStorage.setItem('state', JSON.stringify(lists))
  }

  useEffect(storeState, [lists])
  console.log()

  function loadState() {
    let state = JSON.parse(localStorage.getItem('state'))
    if (state) {
      return state
    } else {
      return []
    }
  }

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
    return fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=79022de2f93a565afea3fa4b02c913d4&language=en-US&page=1")
      .then((response) => response.json())
      .then((results) => {
        const selectedItems = getRandomItems(results.results)
        const titles = selectedItems.map((item) => item.title)
        return titles.map((title) => ({ text: title, completed: false }))
      })
      .catch((error) => console.log("ERROR", error))
  }

  function getItemsFromRecipesAPI() {
    return fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&rapidapi-key=8f3d47ab4dmsh4bd221be9d6f2e7p123996jsn105aec259d96")
      .then((response) => response.json())
      .then((results) => {
        const selectedItems = getRandomItems(results.results)
        const titles = selectedItems.map((item) => item.name)
        return titles.map((title) => ({ text: title, completed: false }))
      })
      .catch((error) => console.log("ERROR", error))
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
      <AppContext.Provider value={{ lists, createListItem, editListItem, deleteListItem, deleteAllItems, deleteCompletedItems, toggleItem }}>
        <div className="open-sidebar" onClick={() => setNavIsOpen(true)}>
          open
        </div>
        <Sidebar isOpen={navIsOpen} close={() => setNavIsOpen(false)} showModal={() => setShowNewListModal(true)} lists={lists} />
        <Routes>
          <Route path="/" element={<Homepage showModal={() => setShowNewListModal(true)} />} />
          <Route
            path="/lists/:listIndex"
            element={<List
              editListName={editListName}
              deleteList={deleteList}
            />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <NewListModal lists={lists} isOpen={showNewListModal} onClose={() => setShowNewListModal(false)} createList={createList} getItemsFromAPI={getItemsFromAPI} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
