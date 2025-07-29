const url = 'https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=taylorswift';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2b50770698msh6ea4be8ceba4f91p1129d0jsne95622f6fec2',
		'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}