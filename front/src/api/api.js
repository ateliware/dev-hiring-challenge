import axios from 'axios';
    const fetchRepository = async (language) => {
        try {
            const response = await axios.get(`http://localhost:6868/most-starred/${language}`)
            return response.data.items;
        } catch (error) {
            console.log(error)
        }
    }

export { fetchRepository };