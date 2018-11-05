const elephants = require('../database')
const uuid = require('uuid/v4')

function getAll(limit) {
    return limit ? elephants.slice(0, limit) : elephants
}

function getOne(id) {
    const errors = []
    let response

    const elephantWithId = elephants.find (elephant => elephant.id === id)

    if (!elephantWithId) {
        errors.push('Elephant not found')
        response = { errors }
    }
    else {
        response = elephantWithId
    }

    return response
}

function create ({ species, habitat, endangered }) {
    const errors = []
    let response

    if (!species) {
        errors.push('species is required')
    }

    if (!habitat) {
        errors.push('habitat is required')
    }

    if (!endangered) {
        errors.push('endangered status is required')
    }

    if (!species || !habitat || !endangered) {
        response = { errors }
    }

    else {
        const newElephant = {
            species,
            habitat,
            endangered: !!endangered,
            id: uuid()
        }
        elephants.push(newElephant)
        response = newElephant
    }

    return response
} 

function update (id, { species, habitat, endangered }) {
    const errors404 = []
    const errors400 = []
    let response

    const elephantWithId = elephants.find (elephant => elephant.id === id)

    if (!elephantWithId) {
        errors404.push('Elephant not found')
        return response = { errors404 }
    }

    if (!species && !habitat && !endangered) {
        errors400.push('Please enter updated information')
        return response = { errors400 }
    }

    if (species) {
        if(typeof species === 'string') {
            elephantWithId.species = species
            response = elephantWithId
        }
        else {
            errors400.push('Please enter a species name')
            return response = { errors400 }
        }
    }

    if (habitat) {
        if(typeof habitat === 'string') {
            elephantWithId.habitat = habitat
            response = elephantWithId
        }
        else {
            errors400.push('Please enter a habitat name')
            return response = { errors400 }
        }
    }

    if (endangered) {
        if (endangered === 'true') {
            elephantWithId.endangered = true
            response = elephantWithId
        }
        else if (endangered === 'false') {
            elephantWithId.endangered = false
            response = elephantWithId
        }
        else {
            errors400.push('Please enter true or false')
            return reponse = { errors400 }
        }
    }

    return response
}

function remove(id) {
    const errors = []
    let response

    const elephantWithId = elephants.find (elephant => elephant.id === id)

    if (!elephantWithId) {
        errors.push('Elephant not found')
        return response = { errors }
    }

    response = elephantWithId

    elephantIdx = elephants.indexOf(elephantWithId)

    elephants.splice(elephantIdx, 1)

    return response
}


module.exports = { getAll, getOne, create, update, remove }