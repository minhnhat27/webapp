import axios from 'axios'
import authHeader from '../auth-header'

const User_URL = 'https://localhost:44304/api/admin/user'

const getAllUser = () => axios.get(User_URL + '/getAllUser', { headers: authHeader() })

const getActiveUsers = () => axios.get(User_URL + '/getActiveUsers', { headers: authHeader() })

const getRoles = () => axios.get(User_URL + '/getRoles', { headers: authHeader() })

const addUser = (data) => axios.post(User_URL + '/addUser', data, { headers: authHeader() })

const updateUser = (data) => axios.put(User_URL + '/updateUser', data, { headers: authHeader() })

const blockUser = (data) => axios.put(User_URL + '/blockUser', data, { headers: authHeader() })

const unblockUser = (data) => axios.put(User_URL + '/unblockUser', data, { headers: authHeader() })

const UserManagementService = {
  getAllUser,
  getRoles,
  addUser,
  updateUser,
  blockUser,
  unblockUser,
  getActiveUsers,
}
export default UserManagementService
