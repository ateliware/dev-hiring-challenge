import axios from 'axios';
    const fetchRepository = async (language) => {
        try {
            const response = await axios.get(`https://ec2-3-85-190-45.compute-1.amazonaws.com:6868/most-starred/${language}`)
            return response.data.items;
        } catch (error) {
            console.log(error)
        }
    }

export { fetchRepository };