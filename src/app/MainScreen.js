import React, { useEffect, useState } from 'react';
import EditorScreen from './EditorScreen'
import './MainScreen.css'

export default function MainScreen({cases, setSelectedCase, selectedCase}) {

    console.log(cases);
    const displayCases = () => {
        return cases?.map((elem) => <li key={elem.id} className={'case_line' + (selectedCase?.id === elem.id ? ' _selected' : '')} onClick={() => setSelectedCase(elem)}>{elem.caseType} : {elem.ticket}</li>
    )};

    return (
            <aside className='side'>
                <div>{displayCases()}</div>
            </aside>
    )
}
