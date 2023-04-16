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
