import axios from 'axios'
import authHeader from './auth-header'

const Schedule_URL = 'https://localhost:44304/api/schedule'

const getTeaching = () => {
  return axios.get(Schedule_URL + '/getTeachingofLecturer', { headers: authHeader() })
}

const saveSchedule = (data) => {
  return axios.post(Schedule_URL + '/saveSchedule', data, { headers: authHeader() })
}

const updateOnSchedule = (data) => {
  return axios.put(Schedule_URL + '/updateOnSchedule', data, { headers: authHeader() })
}

const getSchedule = (week) => {
  return axios.get(Schedule_URL + `/getSchedule?week=${week}`)
}

const downloadSchedule = () => {
  return axios.get(Schedule_URL + '/download', { responseType: 'blob' })
}

const UserService = {
  getTeaching,
  saveSchedule,
  updateOnSchedule,
  getSchedule,
  downloadSchedule,
}
export default UserService
