const uuid = require('uuid/v4')
const fs = require('fs')
let movies = []

function getAll(){
    readFile()
    return movies
}

function create (body) {
    readFile()
    let errors
    const title = body.title
    const director = body.director
    const year = body.year
    const rating = body.rating
    const movieUrl = body.movieUrl
    let response
    if (!title || !director || !year || !rating || !movieUrl) {
        errors = {status: 400, message: "All fields are required!"}
        response = { errors }
    } else {
    const movie = { id: uuid(), title, director, year, rating, movieUrl }
        movies.push(movie)
        response = movie
    }
    writeFile()
    return response
}

function getOne (id) {
    readFile()
    let errors
    let response
    let getIndex
    for (let i = 0; i < movies.length; i++){
        if (id == movies[i].id){
            getIndex = i
        }
    }
    if (getIndex == undefined){
        errors = {status: 404, message: "Movie not found!"}
        response = { errors }
    } else {
        response = movies[getIndex]
    }
    return response
}

function deleteOne (id) {
    readFile()
    let errors
    let response
    let delIndex
    for (let i = 0; i < movies.length; i++){
        if (id == movies[i].id){
            delIndex = i
        }
    }
    if (delIndex == undefined){
        errors = {status: 404, message: "Movie not found!"}
        response = { errors }
    } else {
        response = movies.splice(delIndex, 1)
    }
    writeFile()
    return response
}

function editOne (body, id) {
    readFile()
    let errors
    const title = body.title
    const director = body.director
    const year = body.year
    const rating = body.rating
    const movieUrl = body.movieUrl
    let response
    let index
    for (let i = 0; i < movies.length; i++){
        if (id == movies[i].id) {
            index = i
        }
    }
    if (!title || !director || !year || !rating || !movieUrl) {
        errors = {status: 400, message: "All fields are required!"}
        response = { errors }
    } else if (index == undefined) {
        errors = {status: 404, message: "Movie not found."}
        response = { errors }
    } else {
        movies[index].title = title
        movies[index].director = director 
        movies[index].year = year
        movies[index].rating = rating
        movies[index].movieUrl = movieUrl
        response = movies[index]
    }
    writeFile()
    return response
}

function readFile(){
    let current = JSON.parse(fs.readFileSync('./src/storage.json', 'utf-8'))
    if (current.data){
        movies = current.data
    }
}

function writeFile(){
    let jsonContent = JSON.stringify({movies})
    fs.writeFileSync('./src/storage.json', jsonContent)
}

module.exports = { getAll, create, getOne, deleteOne, editOne }