import React, { useEffect, useState } from 'react';
import './EditorScreen.css'

export default function EditorScreen({selectedCase}) {

    console.log(selectedCase)

    const submitEdit = (e) => {
        e.preventDefault();
        console.log("here we go");
    }

    function renderField() {
        const inputs = selectedCase?.fields?.map((f => {
            console.log(f)
            return (<input className='field_input' value={(f.value || "")}/>)
        }))
        return inputs
    }

    return (
        <form onSubmit={(e) => submitEdit(e)}>
            <div className='input_container'>{renderField()}</div>
            <button>SAVE</button>
        </form>
    )
}
