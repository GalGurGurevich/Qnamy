import React, { useEffect, useState } from 'react';
import EditorScreen from './EditorScreen'
import './MainScreen.css'

export default function MainScreen() {

    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState({});

    useEffect(() => {
        fetch("/cases").then(response => response.json())
        .then(data => setCases(data));
    } ,[])

    console.log(cases);
    const displayCases = () => {
        return cases?.map((elem) => <li key={elem.id} className={'case_line' + (selectedCase?.id === elem.id ? ' _selected' : '')} onClick={() => setSelectedCase(elem)}>{elem.caseType} : {elem.ticket}</li>
    )};

    return (
        <div className="main_screen_container">
            <aside className='side'>
                <div>{displayCases()}</div>
            </aside>
            <aside className='side'>
                {selectedCase && (<div>Selected: {selectedCase.caseType} {selectedCase.ticket}</div>)}
                <EditorScreen selectedCase={selectedCase} />
            </aside>
        </div>
    )
}
