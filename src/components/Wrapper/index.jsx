import style from './Wrapper.module.scss'

export default function Wrapper({ children, className, onDragOver, onDrop, onClick }) {
  return (
    <div
      onClick={onClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`${style.wrapper} ${className} rounded-md overflow-auto w-full bg-white`}
    >
      {children}
    </div>
  )
}
