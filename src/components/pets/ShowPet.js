import React, {useState, useEffect} from 'react'
import { getOnePet, updatePet, removePet } from '../../api/pets'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import {showPetSuccess, showPetFailure} from '../shared/AutoDismissAlert/messages'
import EditPetModal from './EditPetModal'
import ShowToy from '../toys/ShowToy'
import GiveToyModal from '../toys/GiveToyModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowPet = (props) => {

    const [pet, setPet] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [toyModalOpen, setToyModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showPet', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .then(() => {
                msgAlert({
                    heading: 'Here is the pet!',
                    message: showPetSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No pet found',
                    message: showPetFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeThePet = () => {
        removePet(user, pet.id)
            .then(() => {
                msgAlert({
                    heading: 'pet politely removed!',
                    message: 'theyre gone',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'something went wrong',
                    message: 'that aint it',
                    variant: 'danger',
                })
            })
    }

    let toyCards
    if (pet) {
        if (pet.toys.length > 0) {
            toyCards = pet.toys.map(toy => (
                // need to pass all props needed for updateToy func in edit modal
                <ShowToy 
                    key={toy._id} toy={toy} pet={pet} 
                    user={user} msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!pet) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{pet.fullTitle}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: {pet.age}</small><br/>
                            <small>Type: {pet.type}</small><br/>
                            <small>
                                Adoptable: {pet.adoptable ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setToyModalOpen(true)} className="m-2" variant="info">
                            Give Pet a Toy?
                        </Button>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Pet
                        </Button>
                        <Button onClick={() => removeThePet()}className="m-2" variant="danger">
                            Delete Pet
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {toyCards}
            </Container>
            <EditPetModal 
                pet={pet}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updatePet={updatePet}
                handleClose={() => setModalOpen(false)}
            />
            <GiveToyModal
                pet={pet}
                show={toyModalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalOpen(false)}
            />
        </>
    )
}

export default ShowPet