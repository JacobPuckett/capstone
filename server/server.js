const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const {
    getPokemon,
    addTeam,
    deleteTeam,
} = require('./controller')

app.get('/', (req,res) => {
    res.status(200).sendFile(path.join(__dirname,'../public/index.html'))
})


app.get('/kanto', getPokemon)
app.post('/kanto', addTeam)
app.delete('/kanto/:index', deleteTeam)







app.listen(4000, console.log(`App running on port 4000!`))