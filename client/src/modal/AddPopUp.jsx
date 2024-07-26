import React, { useState } from 'react';
import './addpopup.css';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL || 'https://quadri-project.onrender.com';
const AddWord = (props) => {
  const [word, setWord] = useState('');
  const [tones, setTones] = useState([{ tone: "", meaning: "" }]);

  const addYorubaWord = async (word, meanings) => {
    try {
      const response = await axios.post(`${apiUrl}/addword`, { word, meanings });
      console.log('Word added successfully:', response.data);
    } catch (error) {
      console.error('Error adding word:', error.response ? error.response.data : error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const meanings = tones.map(t => ({ tone: t.tone, definition: t.meaning }));
    await addYorubaWord(word, meanings);
    props.setTrigger(false);
  };

  const addTone = () => {
    setTones([...tones, { tone: "", meaning: "" }]);
  };

  const removeTone = (index) => {
    const newTones = tones.filter((_, i) => i !== index);
    setTones(newTones);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newTones = tones.map((tone, i) => {
      if (i === index) {
        return { ...tone, [name]: value };
      }
      return tone;
    });
    setTones(newTones);
  };

  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-close" onClick={() => props.setTrigger(false)}>x</div>
        <form onSubmit={handleSubmit}>
          <div className='formHead'>
            <h1>Add Word</h1>
          </div>

          <div className="wod">
            <div className="form-group">
              <label htmlFor="word">Word:</label>
              <input 
                type="text" 
                name="word" 
                id="word" 
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </div>
          </div>

          {tones.map((tone, index) => (
            <div className="formBody" key={index}>
              <div className="form-group">
                <label htmlFor={`tone-${index}`}>Tone:</label>
                <input 
                  type="text" 
                  name="tone" 
                  id={`tone-${index}`} 
                  value={tone.tone}
                  onChange={(e) => handleInputChange(index, e)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor={`meaning-${index}`}>Meaning:</label>
                <input 
                  type="text" 
                  name="meaning" 
                  id={`meaning-${index}`} 
                  value={tone.meaning}
                  onChange={(e) => handleInputChange(index, e)} 
                />
              </div>
              <button type="button" onClick={() => removeTone(index)}>Delete</button>
            </div>
          ))}

          <div className="button-group">
            <button type="button" onClick={addTone}>More Tone</button>
            <button type="submit">ADD</button>
          </div>
        </form>
      </div>
    </div>
  ) : "";
}

export default AddWord;