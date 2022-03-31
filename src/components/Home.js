import IndexPets from "./pets/IndexPets"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>Home Page</h2>
			<IndexPets/>
		</>
	)
}

export default Home
