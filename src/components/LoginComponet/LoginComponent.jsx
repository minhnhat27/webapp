import Button from '../UI/Button'
import AuthService from '../../services/auth-service'
import { useAuth } from '../../App'
import actions from '../../services/authAction'
import noticationService from '../../services/notificationService'
import Input from '../UI/Input'

import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google'

export default function LoginComponent({ setLoading, setIsForget }) {
  const { state, dispatch } = useAuth()
  const isAuthenticated = state.isAuthenticated

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    getValues,
  } = useForm()

  useLayoutEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmitLogin = () => {
    setLoading(true)
    const data = {
      username: getValues('username'),
      password: getValues('password'),
    }
    AuthService.login(data)
      .then(
        (res) => {
          dispatch(actions.LOGIN(res.data.roles))
          navigate('/')
          noticationService.Success('Đăng nhập thành công')
          setLoading(false)
        },
        () => {
          noticationService.Danger('Tên tài khoản hoặc mật khẩu không chính xác')
          setFocus('password')
          setLoading(false)
        },
      )
      .catch((er) => {
        noticationService.Warning('Có lỗi xảy ra: ' + er.message)
        setFocus('password')
        // setValue('password', '')
        setLoading(false)
      })
  }

  const handleSuccessLoginGG = (credentialResponse) => {
    setLoading(true)

    AuthService.loginGoogle(credentialResponse.credential)
      .then((res) => {
        if (res.status === 200) {
          dispatch(actions.LOGIN(res.data.roles))
          navigate('/')
          noticationService.Success('Đăng nhập thành công')
          setLoading(false)
        } else if (res.status === 203) {
          noticationService.Warning('Tài khoản không hợp lệ. Vui lòng chọn tài khoản khác')
          setLoading(false)
        }
      })
      .catch((er) => {
        noticationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }

  const handleErrorLoginGG = () => {
    noticationService.Danger('Đăng nhập thất bại: Có lỗi xảy ra')
  }

  return (
    <>
      <p className="text-center font-semibold text-xl dark:text-gray-300">Đăng nhập vào hệ thống</p>
      <form onSubmit={handleSubmit(handleSubmitLogin)} className="space-y-3 mt-3">
        <div>
          <Input
            type="text"
            name="username"
            className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Mã cán bộ/Email"
            id="username"
            {...register('username', { required: 'Không được để trống' })}
          />
          <span className="text-xs text-red-500">{errors.username && errors.username.message}</span>
        </div>
        <div>
          <div className="flex">
            <Input
              type={showPassword ? 'text' : 'password'}
              className="w-full p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
              placeholder="Mật khẩu"
              name="password"
              id="password"
              {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
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
        <div className="flex items-center justify-between">
          <div>
            <Input type="checkbox" id="flexCheckChecked" />
            <label className="ml-1 dark:text-gray-300" htmlFor="flexCheckChecked">
              Ghi nhớ
            </label>
          </div>
          <Button type="button" onClick={() => setIsForget(true)} className="text-blue-500">
            Quên mật khẩu?
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full py-2 fs-4 rounded-sm bg-gradient-to-r from-emerald-100 to-sky-300 text-slate-800 font-semibold"
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex justify-center mt-3">
        <GoogleLogin
          onSuccess={(credentialResponse) => handleSuccessLoginGG(credentialResponse)}
          onError={() => handleErrorLoginGG()}
        />
      </div>
    </>
  )
}
