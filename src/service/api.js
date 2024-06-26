import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
}