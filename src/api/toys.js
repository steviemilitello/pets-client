import apiUrl from '../apiConfig'
import axios from 'axios'


// POST -> create function
export const giveToy = (user, petId, newToy) => {
    console.log('user', user)
    console.log('this is newPet', newToy)
    return axios({
        url: `${apiUrl}/toys/${petId}`,
        method: 'POST',
        data: { toy: newToy }
    })
}

// PATCH -> update function
export const updateToy = (user, petId, toyId, updatedToy) => {
    console.log('user', user)
    console.log('this is newPet', updatedToy)
    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { toy: updatedToy }
    })
}

// DELETE -> remove function
export const removeToy = (user, petId, toyId) => {
    console.log('user', user)
    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}