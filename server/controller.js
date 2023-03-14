const axios = require('axios')
const { response } = require('express')

let pokeArr = []


module.exports = {
    getPokemon: (req,res) => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => {
            // console.log(response.data.results)
            res.status(200).send(response.data.results)
        })
    },
    addTeam: (req,res) => {
        pokeArr.push(req.body.pokeName)
        res.status(200).send(pokeArr)
    },
    deleteTeam: (req,res) => {
        // for(let i = 0; i < pokeArr.length; i++){
        //     pokeArr.splice(0,pokeArr.length)
        // }
        // res.status(200).send(pokeArr)
        let { index } = req.params
        pokeArr.splice(+index,1)
        res.status(200).send(pokeArr)
    }
  
}

