const elephants = require('../database')
const uuid = require('uuid/v4')

function getAll(limit) {
    return limit ? elephants.slice(0, limit) : elephants
}


function getOne(id) {
    const errors = []
    let response

    const elephantWithId = elephants.find(elephant => elephant.id === id)

    if (!elephantWithId) {
        errors.push('Elephant not found')
        return response = { errors }
    }

    response = elephantWithId
    return response
}


function create({ species, habitat, endangered }) {
    const errors = []
    let response

    if (!species || species.length > 30) {
        errors.push('species is required')
        return response = { errors }
    }

    if (!habitat || habitat.length > 30) {
        errors.push('habitat is required')
        return response = { errors }
    }

    if (!endangered) {
        errors.push('endangered status is required')
        return response = { errors }
    }

    const newElephant = {
        species,
        habitat,
        id: uuid()
    }

    let boolean = endangeredStatus(endangered, newElephant)

    if (boolean.error) {
        errors.push(boolean.error)
        return response = { errors }
    }

    elephants.push(newElephant)
    response = newElephant

    return response
}


function endangeredStatus (endangered, elephant) {
    let response
    let error = []
    if (endangered === 'true') {
        elephant.endangered = true
    }
    else if (endangered === 'false') {
        elephant.endangered = false
    }
    else {
        error.push('Please enter true or false')
        return reponse = { error }
    }
    return elephant.endangered
}


function update(id, { species, habitat, endangered }) {
    const errors404 = []
    const errors400 = []
    let response

    const elephantWithId = elephants.find(elephant => elephant.id === id)

    if (!elephantWithId) {
        errors404.push('Elephant not found')
        return response = { errors404 }
    }

    if (!species && !habitat && !endangered) {
        errors400.push('Please enter updated information')
        return response = { errors400 }
    }

    if (species) { 
        if (species.length <= 30) {
            elephantWithId.species = species
        }
        else {
            errors400.push('Please enter a species name')
            return response = { errors400 }
        }
    }

    if (habitat) {
        if (habitat.length <= 30) {
            elephantWithId.habitat = habitat
        }
        else {
            errors400.push('Please enter a habitat name')
            return response = { errors400 }
        }
    }

    let boolean
    if (endangered) {
        boolean = endangeredStatus(endangered, elephantWithId)
        if (boolean.error) {
            errors400.push(boolean.error)
            return response = { errors400 }
        }
    }


    response = elephantWithId
    return response
}


function remove(id) {
    const errors = []
    let response

    const elephantWithId = elephants.find(elephant => elephant.id === id)

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