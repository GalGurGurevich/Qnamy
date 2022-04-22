import React, { useEffect, useState } from 'react';

export default function MainScreen() {

    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetch("/cases").then(response => response.json())
        .then(data => setCases(data));
    } ,[])

    return (
        <div className="main_screen_container">
            <aside>
                <div>Side A</div>
            </aside>
            <aside>
                <div>Side B</div>
            </aside>
        </div>
    )
}
