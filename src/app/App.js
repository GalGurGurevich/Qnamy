import React, { useEffect, useState } from 'react';
import MainScreen from './MainScreen.js'
import EditorScreen from './EditorScreen'

export function App() {

  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState({});

  useEffect(() => {
    fetch("/cases").then(response => response.json())
    .then(data => setCases(data));
  } ,[])

  return (
    <div className="main_screen_container">
      <MainScreen cases={cases} setCases={setCases} setSelectedCase={setSelectedCase} selectedCase={selectedCase}/>
      <EditorScreen selectedCase={selectedCase}/>
    </div>
  );
}
