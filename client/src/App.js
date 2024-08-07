import './App.css';
import React, { useState } from 'react';

import axios from 'axios';
import AddWord from './modal/AddPopUp';

const apiUrl = process.env.REACT_APP_API_URL || 'https://quadri-project.onrender.com';
function App() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        console.log(inputValue);
        const response = axios.get(`${apiUrl}/getmeanings/${inputValue}`);
        response.then((res) => {
            console.log(res.data);
            if (res.status === 201) {
                alert('Error with word')
                return
            }
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
            <button className="addBtn" onClick={() => setTrigger(true)}>Add Word</button>
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

        <AddWord trigger={trigger} setTrigger={setTrigger} />
        </div>
    );
}

export default App;
