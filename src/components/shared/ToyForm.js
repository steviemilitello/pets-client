import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ToyForm = (props) => {
    
    const {toy, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is the toy's name?"
                    value={toy.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    placeholder="what kind of toy is it?"
                    value={toy.description}
                    name='description'
                    onChange={handleChange}
                />
                <Form.Check 
                    label='is it squeaky??'
                    name='isSqueaky'
                    defaultChecked={toy.isSqueaky}
                    onChange={handleChange}
                />
                <Form.Select aria-label="toy condition" name="condition" defaultValue={toy.condition} onChange={handleChange}>
                    <option>Open this select menu</option>
                    <option value="new">new</option>
                    <option value="used">used</option>
                    <option value="disgusting">disgusting</option>
                </Form.Select>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default ToyForm