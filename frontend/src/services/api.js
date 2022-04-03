import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ateliwarehiring.herokuapp.com'
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