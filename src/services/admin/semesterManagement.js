import axios from 'axios'
import authHeader from '../auth-header'

const Semester_URL = 'https://localhost:44304/api/admin/semester'

const getSemesters = () => axios.get(Semester_URL + '/getSemesters', { headers: authHeader() })

const setCurrentSemester = (data) => axios.post(Semester_URL + '/setCurrentSemester', data, { headers: authHeader() })

const setStartDate = (data) => axios.put(Semester_URL + '/setStartDate', data, { headers: authHeader() })

const getDateOff = () => axios.get(Semester_URL + '/getDateOff', { headers: authHeader() })

const addDateOff = (data) => axios.post(Semester_URL + '/addDateOff', data, { headers: authHeader() })

const removeDateOff = (data) => axios.post(Semester_URL + '/removeDateOff', data, { headers: authHeader() })

const SemesterManagement = {
  getSemesters,
  setCurrentSemester,
  setStartDate,
  getDateOff,
  addDateOff,
  removeDateOff,
}
export default SemesterManagement
