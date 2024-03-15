import axios from 'axios'
import authHeader from '../auth-header'

const Teaching_URL = 'https://localhost:44304/api/admin/teaching'

const getTeaching = (data) => axios.post(Teaching_URL + '/getTeaching', data, { headers: authHeader() })

const getCourses = () => axios.get(Teaching_URL + '/getCourses', { headers: authHeader() })

const getCourseGroups = (data) => axios.post(Teaching_URL + '/getCourseGroups', data, { headers: authHeader() })

const addTeaching = (data) => axios.post(Teaching_URL + '/addTeaching', data, { headers: authHeader() })

const removeTeaching = (data) => axios.post(Teaching_URL + '/removeTeaching', data, { headers: authHeader() })

const TeachingManagementService = {
  getTeaching,
  getCourses,
  getCourseGroups,
  addTeaching,
  removeTeaching,
}
export default TeachingManagementService
