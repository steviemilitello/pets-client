import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const PetForm = (props) => {
    
    const {pet, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is your pet's name?"
                    value={pet.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="what type of animal is your pet?"
                    value={pet.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    placeholder="what is your pet's age?"
                    value={pet.age}
                    type="number"
                    name='age'
                    onChange={handleChange}
                />
                <Form.Check 
                    label='is this pet adoptable?'
                    name='adoptable'
                    defaultChecked={pet.adoptable}
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default PetForm