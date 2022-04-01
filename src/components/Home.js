import IndexPets from "./pets/IndexPets"

const Home = (props) => {
	// const { msgAlert, user } = props
	const {user, msgAlert} = props

	return (
		<>
			<h2>Home Page</h2>
			<IndexPets user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
