import { useEffect, useState } from 'react'
import UserManagementService from '../../../services/admin/userManagementService'
import notificationService from '../../../services/notificationService'
import Button from '../../../components/UI/Button'

import { BsPlusCircleFill, BsTrash3Fill } from 'react-icons/bs'
import AddTeaching from './AddTeaching'
import TeachingManagementService from '../../../services/admin/teachingManagement'
import Confirm from '../../../components/Modal/Modal'

export default function TeachingSchedule() {
  const [users, setUsers] = useState([])
  const [isAddTeaching, setIsAddTeaching] = useState(false)
  const [update, setUpdate] = useState(false)

  const [userId, setUserId] = useState('')
  const [teaching, setTeaching] = useState([])

  const [courseId, setCourseId] = useState('')
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)

  const onSelectUser = (data) => setUserId(data)

  useEffect(() => {
    UserManagementService.getActiveUsers()
      .then((res) => {
        setUsers(res.data)
        setUserId(res.data[0].id)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra'))
  }, [])

  useEffect(() => {
    if (userId !== '') {
      TeachingManagementService.getTeaching({ id: userId })
        .then((res) => setTeaching(res.data))
        .catch(() => notificationService.Warning('Có lỗi xảy ra'))
    }
  }, [userId, update])

  const handleRemoveTeaching = (courseId) => {
    TeachingManagementService.removeTeaching({ id: courseId })
      .then(() => {
        notificationService.Success('Đã xóa lịch giảng dạy')
        setShowRemoveConfirm(false)
        setUpdate(!update)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra'))
  }

  return (
    <>
      <div className="flex space-x-1">
        <select
          onChange={(e) => onSelectUser(e.target.value)}
          className="overflow-auto outline-none border rounded-sm p-1"
        >
          {users.map((item, i) => {
            return (
              <option key={i} value={item.id}>
                {item.id}. {item.fullName}
              </option>
            )
          })}
        </select>
        <div className="h-full">
          <Button onClick={() => setIsAddTeaching(true)} className="border mx-2 p-3 rounded-md hover:bg-gray-100">
            <BsPlusCircleFill className="text-lg text-blue-500 hover:text-blue-600" title="Thêm học phần giảng dạy" />
          </Button>
        </div>
      </div>
      <div className="overflow-auto mt-2">
        <table className="lg:w-2/3 w-full">
          <thead className="bg-gray-500 text-gray-200">
            <tr>
              <th className="w-0">STT</th>
              <th>Nhóm học phần</th>
              <th>Tên học phần</th>
              <th>Số buổi thực hành</th>
              <th className="w-12">Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {teaching.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.courseGroup}</td>
                  <td>{item.courseName}</td>
                  <td>{item.numberOfSessions}</td>
                  <td>
                    <div
                      onClick={() => {
                        setShowRemoveConfirm(true)
                        setCourseId(item.courseGroup)
                      }}
                      className="cursor-pointer flex items-center justify-center"
                    >
                      <BsTrash3Fill className="text-red-500" title="Xóa" />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <AddTeaching
        isAddTeaching={isAddTeaching}
        setIsAddTeaching={setIsAddTeaching}
        userId={userId}
        update={update}
        setUpdate={setUpdate}
      />
      <Confirm
        message="Xác nhận xóa lịch giảng dạy của cán bộ này"
        isShow={showRemoveConfirm}
        handleConfirm={() => handleRemoveTeaching(courseId)}
        handleClose={() => setShowRemoveConfirm(false)}
      />
    </>
  )
}
