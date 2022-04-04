import axios from 'axios'

const api = axios.create({
    baseURL: 'localhost:5000'
})

export default {
    getRepo(path, language){
        return api.post(path, language).then(
            (response) => {
                console.log(response)
                return response.data
            },
            (error) => {
                console.log(error)
            })
    },

    listen(codes = []) {
        return api.get(`/all/${codes.join()}`)
    }
}