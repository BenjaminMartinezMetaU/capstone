import * as React from 'react';
import './Wiki.css';
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Wiki() {

    const [value, setValue] = useState('');

    return (
      <div className='wiki'>
        Wiki
        <ReactQuill theme="snow" value={value} onChange={setValue}/>
        {console.log("value: ", value)}

      
      </div>
    );
  
}
