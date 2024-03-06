import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import Wrapper from '../Wrapper'
import Button from '../UI/Button'

export default function Modal({ isShow, handleConfirm, handleClose, message }) {
  const nodeRef = useRef()

  return (
    <CSSTransition nodeRef={nodeRef} in={isShow} timeout={300} unmountOnExit classNames="my-node">
      <div
        ref={nodeRef}
        className="bg-gray-300 bg-opacity-90 fixed top-0 w-full h-full flex items-center justify-center z-10"
      >
        <div className="border rounded-md lg:w-1/3 md:w-1/2 sm:w-3/4 w-11/12 max-h-screen overflow-auto">
          <Wrapper className="p-4 h-full bg-gray-100 space-y-2">
            <div>{message}</div>
            <hr />
            <div className="flex justify-center space-x-2 text-white">
              <Button type="button" className="border p-2 rounded-md bg-blue-500" onClick={handleConfirm}>
                Xác nhận
              </Button>
              <Button type="button" className="border p-2 rounded-md bg-gray-500" onClick={handleClose}>
                Đóng
              </Button>
            </div>
          </Wrapper>
        </div>
      </div>
    </CSSTransition>
  )
}
