import '../App.css';
import React, { useState } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'https://quadri-project.onrender.com';
const Home = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
      setInputValue(e.target.value);
  };

  const handleSearch = () => {
      setError('')
      console.log(inputValue);
      const response = axios.get(`${apiUrl}/getmeanings/${inputValue}`);
      response.then((res) => {
          console.log(res.data);
          if (res.status === 201) {
              // alert('Error with word')
              setError('Word not in Database')
              return
          }
          setResult(res.data);
      });
  };


  return (
      <div className="container">
          <div className="heading">
              <h1>YORUBA ORTHOGRAPHY SYSTEM</h1>
              <h1 id="error" style={{color: 'red'}}>{error}</h1>
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
          <button className="addBtn" onClick={() => navigate('/add')}>Add Word</button>
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
 
export default Home;