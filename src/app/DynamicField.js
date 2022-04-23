import React, { useEffect, useState } from 'react';

export default function DynamicField({field}) {

    console.log("dynamicField field: ", field)
    const [value, setValue] = useState((field.value || ""))

    return (
        <input className='field_input' value={value} onChange={(e) => setValue(e.target.value)}/>
    )
}
