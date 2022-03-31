import React, {useState, useEffect} from 'react'
import {getOnePet} from '../../api/pets'
import {useParams} from 'react-router-dom'

const ShowPet = (props) => {
    console.log('props in showPet', props)
    const {params} = useParams()
    console.log('params in showPet', params)
    return (
        <p>Show pet component</p>
    )
}

export default ShowPet