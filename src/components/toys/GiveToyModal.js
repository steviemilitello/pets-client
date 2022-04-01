import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import {giveToy} from '../../api/toys.js'

const GiveToyModal = (props) => {
    const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props
    const [toy, setToy] = useState({})

    const handleChange = (e) => {
        // e === event
        e.persist()

        setToy(prevToy => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "isSqueaky" && e.target.checked){
                value = true
            } else if (name === "isSqueaky" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevToy', prevToy)
            console.log('updatedValue', updatedValue)

            return {...prevToy, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the toy to submit', toy)
        giveToy(user, pet.id, toy)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Toy given to pet!',
                    message: 'great! the pet loves it!',
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
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <ToyForm
                    toy={toy}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give pet a toy!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default GiveToyModal