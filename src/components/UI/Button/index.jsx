import { forwardRef } from 'react'

const Button = forwardRef(({ children, className, type, onClick, disabled, title }, ref) => {
  return (
    <button onClick={onClick} className={className} title={title} type={type} ref={ref} disabled={disabled}>
      {children}
    </button>
  )
})

export default Button
