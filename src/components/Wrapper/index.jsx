import style from './Wrapper.module.scss'

export default function Wrapper({ children, className, onDragOver, onDrop, onClick }) {
  return (
    <div onClick={onClick} onDragOver={onDragOver} onDrop={onDrop} className={`${style.wrapper} ${className}`}>
      {children}
    </div>
  )
}
