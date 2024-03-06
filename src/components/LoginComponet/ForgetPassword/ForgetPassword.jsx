import { useEffect, useState } from 'react'
import Button from '../../UI/Button'
import Input from '../../UI/Input'
import AuthService from '../../../services/auth-service'
import InsideLoading from '../../Loading/InsideLoading'
import notificationService from '../../../services/notificationService'

export default function ForgetPassword({ setIsChangePassword, setIsForget, email, setEmail, verify, setVerify }) {
  const [loading, setLoading] = useState(false)
  const [disabledSend, setDisabledSend] = useState(true)
  const [disabledVerify, setDisabledVerify] = useState(true)
  const [disabledConfirm, setDisabledConfirm] = useState(true)

  const [labelSend, setLabelSend] = useState('Gửi mã')
  const [intervals, setIntervals] = useState([])

  useEffect(() => {
    setEmail('')
    setVerify('')
  }, [setEmail, setVerify])

  function isValidEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    setDisabledSend(!isValidEmail(e.target.value))
    setDisabledVerify(true)

    setLabelSend('Gửi mã')
    intervals.forEach(clearInterval)
  }

  const onChangeVerify = (e) => {
    setVerify(e.target.value)
    if (e.target.value.length === 0) setDisabledConfirm(true)
    else setDisabledConfirm(false)
  }

  const handleSendCode = () => {
    setLoading(true)
    setDisabledSend(true)
    AuthService.sendToken(email)
      .then(
        () => {
          notificationService.Success('Đã gửi mã xác nhận đến địa chỉ email của bạn')
          setDisabledVerify(false)
          setLoading(false)

          let time = 59
          intervals.forEach(clearInterval)

          const timer = setInterval(() => {
            setLabelSend('Gửi lại mã ' + time)
            time -= 1

            if (time === 0) {
              setDisabledSend(false)
              clearInterval(timer)
              setLabelSend('Gửi lại mã')
            }
          }, 1000)
          setIntervals((prevTimer) => [...prevTimer, timer])
        },
        () => {
          notificationService.Danger('Không tìm thấy tài khoản')
          setLoading(false)
        },
      )
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }

  const handleCheckToken = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      email: email,
      token: verify,
    }
    AuthService.checkToken(data)
      .then(
        () => {
          setIsForget(false)
          setIsChangePassword(true)
          setLoading(false)
        },
        () => {
          notificationService.Danger('Mã xác nhận không chính xác')
          setLoading(false)
        },
      )
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        setLoading(false)
      })
  }

  return (
    <>
      {loading && <InsideLoading />}
      <p className="text-center font-semibold text-xl dark:text-gray-300">Quên mật khẩu</p>
      <form className="space-y-3 my-3">
        <Input
          type="email"
          name="email"
          className="w-full p-2 border rounded-md focus:outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Email"
          id="email"
          value={email}
          onChange={onChangeEmail}
        />
        <div className="flex relative w-full border rounded-md">
          <Input
            disabled={disabledVerify}
            type="number"
            className="w-full p-2 rounded-s-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
            placeholder="Nhập mã xác nhận"
            name="verify"
            id="verify"
            value={verify}
            onChange={onChangeVerify}
          />
          <Button
            disabled={disabledSend}
            type="button"
            onClick={handleSendCode}
            className={`${disabledSend ? 'bg-red-300' : 'bg-red-500'} text-sm text-gray-100 w-28 rounded-e-md`}
          >
            <span>{labelSend}</span>
          </Button>
        </div>
        <Button
          disabled={disabledConfirm}
          type="submit"
          onClick={handleCheckToken}
          className={`${
            disabledConfirm
              ? 'bg-gradient-to-r from-emerald-50 to-sky-200 text-slate-500'
              : 'bg-gradient-to-r from-emerald-100 to-sky-300 text-slate-800'
          } w-full py-2 fs-4 rounded-sm font-semibold`}
        >
          Xác nhận
        </Button>
      </form>
    </>
  )
}
