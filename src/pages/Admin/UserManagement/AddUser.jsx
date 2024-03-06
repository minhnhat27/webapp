import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import Wrapper from '../../../components/Wrapper'
import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import UserManagementService from '../../../services/admin/userManagementService'
import notificationService from '../../../services/notificationService'
import InsideLoading from '../../../components/Loading/InsideLoading'

export default function AddUser({ roles, isAddUser, setIsAddUser, update, setUpdate }) {
  const nodeRef = useRef()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm()

  const handleSubmitAddUser = () => {
    setLoading(true)
    UserManagementService.addUser(getValues())
      .then(() => {
        notificationService.Success('Đã thêm Cán bộ')
        setLoading(false)
        setIsAddUser(false)
        setUpdate(!update)
        reset()
      })
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }
  return (
    <CSSTransition nodeRef={nodeRef} in={isAddUser} timeout={300} unmountOnExit classNames="my-node">
      <div
        ref={nodeRef}
        className="bg-gray-300 bg-opacity-90 fixed top-0 w-full h-full flex items-center justify-center z-10"
      >
        <div className="border rounded-md lg:w-2/5 md:w-1/2 sm:w-3/4 w-11/12 max-h-screen overflow-auto">
          {loading && <InsideLoading />}
          <Wrapper className="p-4 h-full bg-gray-100">
            <form onSubmit={handleSubmit(handleSubmitAddUser)} method="POST" className="space-y-2">
              <div>
                <span>Họ và tên</span>
                <div>
                  <Input
                    type="name"
                    name="name"
                    className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                    {...register('fullName', {
                      required: 'Không được để trống',
                      maxLength: { value: 20, message: 'Tối đa 20 kí tự' },
                    })}
                  />
                  <span className="text-xs text-red-500">{errors.name && errors.name.message}</span>
                </div>
              </div>
              <div>
                <span>Email</span>
                <div>
                  <Input
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                    {...register('email', { required: 'Không được để trống' })}
                  />
                  <span className="text-xs text-red-500">{errors.email && errors.email.message}</span>
                </div>
              </div>
              <div>
                <span>Số điện thoại</span>
                <div>
                  <Input
                    type="number"
                    name="phone"
                    className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                    {...register('phoneNumber')}
                  />
                </div>
              </div>
              <div>
                <span>Quyền truy cập</span>
                <select
                  multiple
                  defaultValue={['User']}
                  className="w-full h-16 overflow-auto p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                  {...register('roles')}
                >
                  {roles.map((item, i) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-red-500">* Tài khoản sẽ được gửi về địa chỉ Email tương ứng</div>
              <div className="flex justify-center space-x-2 text-white">
                <Button type="submit" className="border p-2 rounded-md bg-blue-500">
                  Thêm
                </Button>
                <Button
                  type="button"
                  className="border p-2 rounded-md bg-gray-500"
                  onClick={() => {
                    setIsAddUser(false)
                    reset()
                  }}
                >
                  Đóng
                </Button>
              </div>
            </form>
          </Wrapper>
        </div>
      </div>
    </CSSTransition>
  )
}
