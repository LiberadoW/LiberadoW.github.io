export const fetchCardInfo = async () => {
	const options = {
		method: 'GET',
		headers: {
		  'X-RapidAPI-Key': process.env.API_KEY,
		  'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
		}
	  };

	const response = await fetch('https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Legacy?collectible=1', options)
	return response.json()
}