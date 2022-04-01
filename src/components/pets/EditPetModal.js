import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import PetForm from '../shared/PetForm'

const EditPetModal = (props) => {
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props
    const [pet, setPet] = useState(props.pet)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setPet(prevPet => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "adoptable" && e.target.checked){
                value = true
            } else if (name === "adoptable" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevPet', prevPet)
            console.log('updatedValue', updatedValue)

            return {...prevPet, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the pet to submit', pet)
        updatePet(user, pet)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Pet Updated! Success!',
                    message: 'u did it',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'that aint it',
                    variant: 'danger',
                }))
        console.log('this is the pet', pet)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <PetForm 
                    pet={pet}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit pet!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditPetModal