import { forwardRef } from 'react'

const Input = forwardRef(
  (
    {
      className,
      type,
      min,
      onClick,
      onChange,
      readOnly,
      placeholder,
      id,
      name,
      checked,
      value,
      disabled,
      defaultValue,
      defaultChecked,
    },
    ref,
  ) => {
    return (
      <input
        disabled={disabled}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
        id={id}
        value={value}
        min={min}
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
