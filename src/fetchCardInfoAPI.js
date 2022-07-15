export const fetchCardInfo = async () => {
	const options = {
		method: 'GET',
		headers: {
		  'X-RapidAPI-Key': '91bd8f54b6mshce8e72a14a5f7fbp169d93jsnf3fc17b9ea30',
		  'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
		}
	  };

	const response = await fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Legacy?collectible=1', options)
	return response.json()
}