require('dotenv').config()

const axios = require('axios')
const express = require('express')
const port = 5410
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
// const Crop = require('./models/CropSchema')
const YorubaWord = require('./models/yorubaWordsSchema')

app.get('/getallwords', async (req, res) => {
  const yorubaWord = await YorubaWord.find({})
  const word = yorubaWord.map((word) => word.word)
  res.send(word)
})


app.get('/getmeanings/:word', async (req, res) => {
  try {
    const word = req.params.word
    console.log(word);
    // capitalize first word of word
    const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1)
    const yorubaWord = await YorubaWord.find({ word: capitalizedWord })
    if (!yorubaWord) {
      return res.status(204).send('Word not found')
    }
    const meaning = yorubaWord[0].meanings
    res.send(meaning)
  } catch {
    res.status(201).send()
  }
  
})


mongoose.connect(process.env.DB_URI)
  .then(() => app.listen(port, () => console.log(`Backend server is running`)))
  .catch((error) => console.log(error))