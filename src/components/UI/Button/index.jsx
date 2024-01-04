import { forwardRef } from 'react'

const Button = forwardRef(({ children, className, type, onClick, disable, title }, ref) => {
  return (
    <button onClick={onClick} className={className} title={title} type={type} ref={ref} disabled={disable}>
      {children}
    </button>
  )
})

export default Button
