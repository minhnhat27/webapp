import Image from '../../components/UI/Image'
import Wrapper from '../../components/Wrapper'
import logo from '../../logo.svg'
import Loading from '../../components/Loading'
import LoginComponent from '../../components/LoginComponet'

import { useState } from 'react'
import ForgetPassword from '../../components/LoginComponet/ForgetPassword'
import { BsChevronLeft } from 'react-icons/bs'
import ChangePassword from '../../components/LoginComponet/ChangePassword'

export default function Login() {
  const [emailFoget, setEmailForget] = useState('')
  const [verifyForget, setVerifyForget] = useState('')
  const [loading, setLoading] = useState(false)
  const [isForget, setIsForget] = useState(false)
  const [isChangePassword, setIsChangePassword] = useState(false)

  return (
    <>
      {loading && <Loading />}

      <div className="flex h-full items-center justify-center">
        <div className="flex item justify-center lg:w-2/5 md:w-1/2 sm:w-3/4 w-11/12">
          <Wrapper className="mb-0 px-10 py-5 dark:bg-zinc-800">
            {isForget && (
              <BsChevronLeft
                onClick={() => setIsForget(false)}
                className="text-2xl p-1 rounded-full cursor-pointer text-gray-400 hover:bg-slate-400 hover:text-white"
              />
            )}
            <div className="relative flex items-center justify-center">
              <Image width="70" height="70" className="py-2 fs-4" src={logo} alt="logo" />
            </div>
            {isForget || isChangePassword || <LoginComponent setLoading={setLoading} setIsForget={setIsForget} />}
            {isForget && (
              <ForgetPassword
                setIsChangePassword={setIsChangePassword}
                setIsForget={setIsForget}
                email={emailFoget}
                setEmail={setEmailForget}
                verify={verifyForget}
                setVerify={setVerifyForget}
              />
            )}
            {isChangePassword && (
              <ChangePassword
                setIsChangePassword={setIsChangePassword}
                setIsForget={setIsForget}
                email={emailFoget}
                setEmail={setEmailForget}
                verify={verifyForget}
                setVerify={setVerifyForget}
              />
            )}
          </Wrapper>
        </div>
      </div>
    </>
  )
}
