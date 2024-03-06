import { useEffect, useState } from 'react'
import UserManagementService from '../../../services/admin/userManagementService'
import { BsPencilFill, BsPersonFillCheck, BsPersonFillSlash, BsPlusCircleFill } from 'react-icons/bs'
import Button from '../../../components/UI/Button'
import AddUser from './AddUser'
import notificationService from '../../../services/notificationService'
import UpdateUser from './UpdateUser'
import BlockUser from './BlockUser'
import Confirm from '../../../components/Modal/Modal'

export default function UserManagement() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])

  const [isAddUser, setIsAddUser] = useState(false)
  const [isUpdateUser, setIsUpdateUser] = useState(false)
  const [isBlockUser, setIsBlockUser] = useState(false)

  const [userUpdate, setUserUpdate] = useState({})
  const [update, setUpdate] = useState(false)

  const [showUnblock, setShowUnblock] = useState(false)

  useEffect(() => {
    UserManagementService.getRoles().then((res) => {
      setRoles(res.data)
    })
  }, [])

  useEffect(() => {
    UserManagementService.getAllUser()
      .then((res) => setUsers(res.data))
      .catch((er) => notificationService.Warning('Có lỗi xảy ra: ' + er.message))
  }, [update])

  const handleUnblockUser = (id) => {
    UserManagementService.unblockUser({ id: id })
      .then(() => {
        notificationService.Success('Đã mở khóa tài khoản: ' + id)
        setUpdate(!update)
        setShowUnblock(!showUnblock)
      })
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
      })
  }

  return (
    <>
      <div className="flex justify-end py-3 h-16">
        <Button onClick={() => setIsAddUser(true)} className="border mx-2 p-3 rounded-md hover:bg-gray-100">
          <BsPlusCircleFill className="text-lg text-blue-500 hover:text-blue-600" title="Thêm cán bộ" />
        </Button>
      </div>
      <div className="overflow-auto h-full-minus-header">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-500 text-gray-200">
            <tr>
              <th>Mã cán bộ</th>
              <th>Họ và Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Quyền truy cập</th>
              <th>Tình trạng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.emailConfirmed ? 'Đã xác nhận' : <div className="text-red-400">Chưa xác nhận</div>}</td>
                <td>
                  {item.roles.map((item, i) => (
                    <div key={i}>{item}</div>
                  ))}
                </td>
                <td>
                  {item.lockoutEnabled ? (
                    <span className="text-red-500 font-medium">Ngày mở khóa: {item.lockoutEnd}</span>
                  ) : (
                    <span className="text-green-600">Bình thường</span>
                  )}
                </td>
                <td>
                  <div className="flex justify-center space-x-4">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setUserUpdate(users.find((e) => e.id === item.id))
                        setIsUpdateUser(true)
                      }}
                    >
                      <BsPencilFill className="text-blue-500" title="Sửa thông tin" />
                    </div>
                    <div className="cursor-pointer">
                      {item.lockoutEnabled ? (
                        <BsPersonFillCheck
                          onClick={() => {
                            setUserUpdate(users.find((e) => e.id === item.id))
                            setShowUnblock(true)
                          }}
                          className="text-green-500"
                          title="Mở khóa tài khoản"
                        />
                      ) : (
                        <BsPersonFillSlash
                          onClick={() => {
                            setUserUpdate(users.find((e) => e.id === item.id))
                            setIsBlockUser(true)
                          }}
                          className="text-red-500"
                          title="Vô hiệu hóa tài khoản"
                        />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUser roles={roles} isAddUser={isAddUser} setIsAddUser={setIsAddUser} update={update} setUpdate={setUpdate} />
      <UpdateUser
        userUpdate={userUpdate}
        roles={roles}
        isUpdateUser={isUpdateUser}
        setIsUpdateUser={setIsUpdateUser}
        update={update}
        setUpdate={setUpdate}
      />
      <BlockUser
        isBlockUser={isBlockUser}
        setIsBlockUser={setIsBlockUser}
        userUpdate={userUpdate}
        update={update}
        setUpdate={setUpdate}
      />
      <Confirm
        message={'Xác nhận mở khóa tài khoản  ' + userUpdate.id}
        isShow={showUnblock}
        handleConfirm={() => handleUnblockUser(userUpdate.id)}
        handleClose={() => setShowUnblock(false)}
      />
    </>
  )
}
