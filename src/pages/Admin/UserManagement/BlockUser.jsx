import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import InsideLoading from '../../../components/Loading/InsideLoading'
import Wrapper from '../../../components/Wrapper'
import Input from '../../../components/UI/Input'
import { useForm } from 'react-hook-form'
import Button from '../../../components/UI/Button'
import UserManagementService from '../../../services/admin/userManagementService'
import notificationService from '../../../services/notificationService'

export default function BlockUser({ isBlockUser, setIsBlockUser, userUpdate, update, setUpdate }) {
  const nodeRef = useRef()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm()

  const handleSubmitBlockUser = () => {
    setLoading(true)
    const date = new Date(watch('radio') === 'forever' ? '9999-12-30' : watch('date'))
    date.setDate(date.getDate() + 1)
    const data = {
      id: userUpdate.id,
      time: date.toLocaleDateString('af-ZA'),
    }
    UserManagementService.blockUser(data)
      .then(() => {
        notificationService.Success('Đã vô hiệu hóa cán bộ: ' + userUpdate.id)
        setLoading(false)
        setIsBlockUser(false)
        setUpdate(!update)
        reset()
      })
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }

  return (
    <CSSTransition nodeRef={nodeRef} in={isBlockUser} timeout={300} unmountOnExit classNames="my-node">
      <div
        ref={nodeRef}
        className="bg-gray-300 bg-opacity-90 fixed top-0 w-full h-full flex items-center justify-center z-10"
      >
        <div className="border rounded-md lg:w-2/5 md:w-1/2 sm:w-3/4 w-11/12 max-h-screen overflow-auto">
          {loading && <InsideLoading />}
          <Wrapper className="p-4 h-full bg-gray-100">
            <form onSubmit={handleSubmit(handleSubmitBlockUser)} method="post" className="space-y-2">
              <div className="space-x-1">
                <label>
                  <Input
                    type="radio"
                    defaultChecked={true}
                    value="forever"
                    className="border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                    {...register('radio')}
                  />
                  Không thời hạn
                </label>
              </div>

              <div className="space-x-1">
                <label>
                  <Input
                    type="radio"
                    value="time"
                    className="border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                    {...register('radio')}
                  />
                  Vô hiệu hóa đến hết ngày:
                </label>
              </div>

              <div>
                <Input
                  disabled={watch('radio') !== 'time'}
                  type="date"
                  name="date"
                  min={new Date().toLocaleDateString('af-ZA')}
                  className={`${
                    watch('radio') !== 'time' && 'text-gray-500'
                  } w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300`}
                  {...register('date', {
                    required: { value: watch('radio') === 'time', message: 'Vui lòng chọn ngày' },
                  })}
                />
                <span className="text-xs text-red-500">{errors.date && errors.date.message}</span>
              </div>
              <div className="flex justify-center space-x-2 text-white">
                <Button type="submit" className="border p-2 rounded-md bg-blue-500">
                  Xác nhận
                </Button>
                <Button
                  type="button"
                  className="border p-2 rounded-md bg-gray-500"
                  onClick={() => {
                    setIsBlockUser(false)
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
