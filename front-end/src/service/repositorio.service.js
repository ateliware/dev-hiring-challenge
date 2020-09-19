
import axios from "axios"

const url = `${process.env.VUE_APP_URL}/repositorios`;

export default {
  buscarRepositorios(linguagem) {
    return axios.get(`${url}/${linguagem}`);
  }, 
}
