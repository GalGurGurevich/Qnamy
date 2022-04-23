import React, { useEffect, useState } from 'react';
import DynamicField from './DynamicField'
import './EditorScreen.css'

export default function EditorScreen({selectedCase}) {

    console.log("EditorScreen: " ,selectedCase)

    const submitEdit = (e) => {
        e.preventDefault();
        console.log("here we go");
    }

    const renderField = () => {
        return selectedCase?.fields?.map((f => {
            return (<DynamicField field={f}/>)
        }))
    }

    return (
        <form onSubmit={(e) => submitEdit(e)}>
            <div className='input_container'>{renderField()}</div>
            <button>SAVE</button>
        </form>
    )
}
