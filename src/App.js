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
    setLists([...lists, newItem])
  }

  function editListItem(newText, listIndex, itemIndex) {

    const updatedItems = lists[listIndex].map((item, indx) => {
      if (indx === itemIndex) {
        return { text: newText, completed: item.completed }
      }
      return updatedItems
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

  return (
    <div className="App">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/list-1" element={<List />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
