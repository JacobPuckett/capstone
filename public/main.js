// const { response } = require("express")

// const { response } = require("express")
const scrollList = document.querySelector('.scroll_list')
const pokeBox = document.querySelector('.poke_box')
const input = document.querySelector('input')
const form = document.querySelector('form')
const teamList = document.querySelector('#team_list')

let pokeURL = "https://pokeapi.co/api/v2"

const kantoPokemon = (arr) => {
    scrollList.innerHTML = ""
    console.log(arr)
    arr.forEach(element => {
        let newList = document.createElement('div')
        newList.classList.add('pokecolor')
        newList.textContent = element.name
        newList.setAttribute('data-value', element.url)
        scrollList.appendChild(newList)
        newList.addEventListener('click', pokemonData) 
    })
    // .catch(err => console.log(err))
}

function getPokemon(){
    axios.get('/kanto')
    .then(response => kantoPokemon(response.data))
   
}

getPokemon()


const createPokeDisplay = obj => {
    let { name, spritesArr, types } = obj
    let pokeName = document.createElement('h2')
    pokeName.textContent = name[0].toUpperCase() + name.slice(1)
    let pokeTypes = document.createElement('p')
    let addBtn = document.createElement('button')
    addBtn.setAttribute('poke-name', name)
    addBtn.textContent = 'add to team'
    addBtn.classList.add('addBtn')
    addBtn.addEventListener('click', addToTeam)
    pokeTypes = types.textContent
    let imageDiv = document.createElement('div')
    let imageIndex = 2
    let maxIndex = spritesArr.length - 1
    let lastBtn = document.createElement('button')
    lastBtn.classList.add('lastbtn')
    let pokeImg = document.createElement('img')
    pokeImg.classList.add('pokeImages')
    let nextBtn = document.createElement('button')
    nextBtn.classList.add('nextbtn')
    lastBtn.textContent = "previous"
    pokeImg.src=spritesArr[imageIndex]
    lastBtn.addEventListener('click', (evt) => {
        imageIndex--
        if(imageIndex < 0){
            imageIndex = maxIndex
        }
        pokeImg.src = spritesArr[imageIndex]
    })
    nextBtn.textContent = "next"
    nextBtn.addEventListener('click', (evt) => {
        imageIndex++
        if(imageIndex > maxIndex){
            imageIndex = 0
        }
        pokeImg.src = spritesArr[imageIndex]
    })
    imageDiv.appendChild(nextBtn)
    imageDiv.appendChild(pokeImg)
    imageDiv.appendChild(lastBtn)
    imageDiv.appendChild(addBtn)
    pokeBox.appendChild(pokeName)
    pokeBox.appendChild(imageDiv)

    

    
    // pokeBox.appendChild(pokeTypes)
}


const pokemonData = evt => {
    evt.preventDefault()
    axios.get(evt.target.getAttribute('data-value'))
    .then(response => {
        console.log(response.data)
        let { name, sprites, types } = response.data
        console.log(sprites)
        console.log(name)  // all data is showing correctly
        console.log(types) // types are showing but may be tricky to move out
        let spritesArr = []
        for(let i in sprites){
            if(typeof sprites[i] === "string"){
                spritesArr.push(sprites[i])
            }
        }
        console.log(spritesArr) // converted the sprites strings to be in an array with index values

        let pokeObj = { name, types, spritesArr }
        createPokeDisplay(pokeObj)
        // teamList(pokeObj)
    })
}



const pokemonSearch = evt => {
    evt.preventDefault()
    let pokemon = input.value.toLowerCase()
    axios.get(pokeURL + `/pokemon/${pokemon}`)
    .then(response => {
        console.log(response.data)
        let { name, sprites, types } = response.data
        console.log(sprites)
        console.log(name)  // all data is showing correctly
        console.log(types) // types are showing but may be tricky to move out
        let spritesArr = []
        for(let i in sprites){
            if(typeof sprites[i] === "string"){
                spritesArr.push(sprites[i])
            }
        }
        console.log(spritesArr) // converted the sprites strings to be in an array with index values

        let pokeObj = { name, types, spritesArr }
        createPokeDisplay(pokeObj)
    })
}

form.addEventListener('submit', pokemonSearch)

const addToTeam = (evt) => {
    console.log(evt.target)
    let body = {
        pokeName:evt.target.getAttribute('poke-name')}
    
    evt.preventDefault()
    
    
    axios.post('/kanto', body)
    .then(response => {
        teamList.innerHTML = ''
        console.log(response.data)
        let index = 0
        response.data.forEach(element => {
            let poke = document.createElement('h2')
            poke.classList.add('textcolor')
            poke.textContent = element
            teamList.appendChild(poke)
            poke.setAttribute('index', index)
            index ++ 

            poke.addEventListener('click', deleteTeam)
        })
    })
}


const deleteTeam = evt => {
    evt.preventDefault()
    teamList.innerHTML = ''
    axios.delete(`/kanto/${evt.target.getAttribute('index')}`)
    
    .then(response => {
        console.log(response.data)
        let index = 0
        response.data.forEach(element => {
            let poke = document.createElement('h2')
            poke.classList.add('textcolor')
            poke.textContent = element
            teamList.appendChild(poke)
            poke.setAttribute('index', index)
            index ++ 
            poke.addEventListener('click', deleteTeam)
        })
        
        alert('Pokemon has been removed from team')
    })
}

