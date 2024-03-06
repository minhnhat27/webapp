import { useForm } from 'react-hook-form'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import { useState } from 'react'
import InsideLoading from '../../Loading/InsideLoading'
import AuthService from '../../../services/auth-service'
import notificationService from '../../../services/notificationService'

export default function ChangePassword({ setIsChangePassword, setIsForget, email, verify, setEmail, setVerify }) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfimPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfimPassword)
  }

  const handleSubmitChangePassword = () => {
    const data = {
      email: email,
      token: verify,
      newPassword: getValues('confirmPassword'),
    }
    AuthService.changePassword(data)
      .then(() => {
        notificationService.Success('Đổi mật khẩu thành công. Vui lòng đăng nhập lại')
        setIsForget(false)
        setIsChangePassword(false)
        setEmail('')
        setVerify('')
        setLoading(false)
      })
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <InsideLoading />}
      <p className="text-center font-semibold text-xl dark:text-gray-300">Đổi mật khẩu</p>
      <form className="space-y-3 my-3" onSubmit={handleSubmit(handleSubmitChangePassword)}>
        <div>
          <div className="flex">
            <Input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Mật khẩu mới"
              name="password"
              id="password"
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu mới',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu ít nhất 6 ký tự',
                },
              })}
            />
            <Button
              type="button"
              onClick={handleShowPassword}
              className="flex justify-around items-center cursor-pointer"
            >
              {showPassword ? (
                <BsEyeSlash className="absolute mr-10 dark:text-gray-300" size={20} />
              ) : (
                <BsEye className="absolute mr-10 dark:text-gray-300" size={20} />
              )}
            </Button>
          </div>
          <span className="text-xs text-red-500">{errors.password && errors.password.message}</span>
        </div>
        <div>
          <div className="flex">
            <Input
              type={showConfimPassword ? 'text' : 'password'}
              className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Xác nhận mật khẩu"
              name="confirmPassword"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Vui lòng nhập mật khẩu xác nhận',
                validate: (value) => value === getValues('password') || 'Mật khẩu xác nhận không khớp',
              })}
            />
            <Button
              type="button"
              onClick={handleShowConfirmPassword}
              className="flex justify-around items-center cursor-pointer"
            >
              {showConfimPassword ? (
                <BsEyeSlash className="absolute mr-10 dark:text-gray-300" size={20} />
              ) : (
                <BsEye className="absolute mr-10 dark:text-gray-300" size={20} />
              )}
            </Button>
          </div>
          <span className="text-xs text-red-500">{errors.confirmPassword && errors.confirmPassword.message}</span>
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-emerald-100 to-sky-300 text-slate-800 w-full py-2 fs-4 rounded-sm font-semibold"
        >
          Xác nhận
        </Button>
      </form>
    </>
  )
}
