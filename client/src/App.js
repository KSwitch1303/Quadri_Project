import './App.css';
import React, { useState } from 'react';

import axios from 'axios';

function App() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        console.log(inputValue);
        const response = axios.get(`https://quadri-project.onrender.com/getmeanings/${inputValue}`);
        response.then((res) => {
            console.log(res.data);
            setResult(res.data);
        });
    };

    return (
        <div className="container">
            <div className="heading">
                <h1>YORUBA ORTHOGRAPHY SYSTEM</h1>
            </div>
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Type here" 
                    id="input" 
                    value={inputValue} 
                    onChange={handleInputChange} 
                />
                <button id="searchBtn" onClick={handleSearch}>Search</button>
            </div>
           {result ? (
             <div className="result" id="result">
             {result.map((word) => (
                 <div key={word.tone} className="word">
                     <h3>{word.tone}</h3>
                     <p>{word.definition}</p>
                 </div>
             ))}
         </div>
           ): null}
        </div>
    );
}

export default App;
