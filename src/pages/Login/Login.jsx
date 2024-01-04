import Button from '../../components/UI/Button'
import Image from '../../components/UI/Image'
import Wrapper from '../../components/Wrapper'
import AuthService from '../../services/auth-service'
import { useAuth } from '../../App'
import actions from '../../services/authAction'
import logo from '../../logo.svg'
import noticationService from '../../services/notificationService'
import Input from '../../components/UI/Input'
import Loading from '../../components/Loading'

import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { GoogleLogin } from '@react-oauth/google'

export default function Login() {
  const { state, dispatch } = useAuth()
  const isAuthenticated = state.isAuthenticated

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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

    AuthService.login(getValues('username'), getValues('password'))
      .then(
        () => {
          dispatch(actions.LOGIN)
          navigate('/')
          noticationService.Success('Đăng nhập thành công')
          setLoading(false)
        },
        () => {
          noticationService.Danger('Tên tài khoản hoặc mật khẩu không chính xác')
          setFocus('password')
          setValue('password', '')
          setLoading(false)
        },
      )
      .catch((er) => {
        console.log(er)
        noticationService.Danger('Đăng nhập thất bại: ' + er.message)
        setFocus('password')
        setValue('password', '')
        setLoading(false)
      })
  }

  const handleSuccessLoginGG = (credentialResponse) => {
    setLoading(true)
    AuthService.loginGoogle(credentialResponse.credential)
      .then(
        () => {
          dispatch(actions.LOGIN)
          navigate('/')
          noticationService.Success('Đăng nhập thành công')
          setLoading(false)
        },
        () => {
          noticationService.Warning('Tài khoản không hợp lệ. Vui lòng chọn tài khoản khác')
          setLoading(false)
        },
      )
      .catch((er) => {
        console.log(er)
        noticationService.Danger('Đăng nhập thất bại: ' + er.message)
        setFocus('password')
        setValue('password', '')
        setLoading(false)
      })
  }

  const handleErrorLoginGG = () => {
    noticationService.Danger('Đăng nhập thất bại: Có lỗi xảy ra')
  }

  return (
    <>
      {loading && <Loading />}
      <div className="flex h-full items-center justify-center">
        <div className="flex item justify-center lg:w-2/5 md:w-1/2 sm:w-3/4 w-11/12">
          <Wrapper className="mb-0 px-10 py-5 dark:bg-zinc-800">
            <div className="relative flex items-center justify-center">
              <Image width="70" height="70" className="py-2 fs-4" src={logo} alt="logo" />
            </div>
            <p className="text-center font-semibold text-xl dark:text-gray-300">Đăng nhập vào hệ thống</p>
            <form onSubmit={handleSubmit(handleSubmitLogin)}>
              <div className="my-3">
                <Input
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded-md focus:outline-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  placeholder="Mã cán bộ/Email"
                  id="username"
                  {...register('username', { required: 'Không được để trống' })}
                />
                <span className="text-xs text-red-500">{errors.username && errors.username.message}</span>
              </div>
              <div className="my-3">
                <div className="flex">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full p-2 border rounded-md focus:outline-blue-500 dark:bg-gray-700 dark:text-gray-300"
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Input type="checkbox" id="flexCheckChecked" />
                  <label className="ml-1 dark:text-gray-300" htmlFor="flexCheckChecked">
                    Ghi nhớ
                  </label>
                </div>
                <Link className="text-blue-500">Quên mật khẩu?</Link>
              </div>
              <Button
                type="submit"
                className="w-full py-2 fs-4 mb-4 rounded-sm bg-gradient-to-r from-emerald-100 to-sky-300 text-slate-800 font-semibold"
              >
                Đăng nhập
              </Button>
            </form>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => handleSuccessLoginGG(credentialResponse)}
                onError={() => handleErrorLoginGG()}
              />
            </div>
          </Wrapper>
        </div>
      </div>
    </>
  )
}
