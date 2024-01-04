import { forwardRef } from 'react'

const Input = forwardRef(
  (
    {
      className,
      type,
      onClick,
      readOnly,
      placeholder,
      onChange,
      id,
      name,
      checked,
      value,
    },
    ref,
  ) => {
    return (
      <input
        id={id}
        value={value}
        name={name}
        onClick={onClick}
        className={className}
        type={type}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={onChange}
        checked={checked}
        ref={ref}
      />
    )
  },
)
export default Input
