import axios, { Method } from 'axios'

const XHRService = {

  request: async (method: Method, url: string, body?: any) => {

    try {

      const response = await axios({
        method: method,
        url: url,
        data: body ?? null
      })

      return response.data

    } catch (error) {
      console.log(error)
    }


  }
}

export default XHRService