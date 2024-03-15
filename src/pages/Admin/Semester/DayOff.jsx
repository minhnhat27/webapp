import { useEffect, useState } from 'react'
import SemesterManagement from '../../../services/admin/semesterManagement'
import { BsCheck2All, BsTrash3Fill } from 'react-icons/bs'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/Button'
import notificationService from '../../../services/notificationService'
import Confirm from '../../../components/Modal'

export default function DateOff() {
  const [dateOff, setDateOff] = useState([])
  const [date, setDate] = useState('')
  const [disabledSaveDateOff, setDisabledSaveDateOff] = useState(true)
  const [update, setUpdate] = useState(false)
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)
  const [deleteDate, setDeleteDate] = useState('')

  useEffect(() => {
    SemesterManagement.getDateOff().then((res) => {
      const DOff = []
      res.data.forEach((item) => {
        const d = new Date(item.ngayNghi)
        DOff.push(d)
      })
      setDateOff(DOff)
    })
  }, [update])

  const handleChangeDateOff = (e) => {
    setDate(e)
    setDisabledSaveDateOff(false)
  }

  const handleSaveDateOff = () => {
    const data = { date: new Date(date).toLocaleDateString('af-ZA') }
    SemesterManagement.addDateOff(data)
      .then(() => {
        notificationService.Success('Đã thêm ngày nghỉ')
        setUpdate(!update)
        setDisabledSaveDateOff(true)
        setDate('')
      })
      .catch(() => {
        notificationService.Info('Đã có ngày nghỉ này')
        setDisabledSaveDateOff(true)
        setDate('')
      })
  }

  const handleRemoveDate = (e) => {
    const data = { date: e.toLocaleDateString('af-ZA') }
    SemesterManagement.removeDateOff(data)
      .then(() => {
        notificationService.Success('Đã xóa ngày nghỉ')
        setUpdate(!update)
        setShowRemoveConfirm(false)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra. Vui  lòng thử lại'))
  }

  return (
    <>
      <div className="space-y-2">
        <div className="overflow-auto mt-2 max-h-64">
          <table className="lg:w-1/2 w-full">
            <thead className="bg-gray-500 text-gray-200 sticky top-0">
              <tr>
                <th className="w-0">STT</th>
                <th>Ngày nghỉ</th>
                <th className="w-0">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {dateOff.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.toLocaleDateString('en-GB')}</td>
                    <td>
                      <div
                        onClick={() => {
                          setShowRemoveConfirm(true)
                          setDeleteDate(item)
                        }}
                        className="cursor-pointer flex items-center justify-center"
                      >
                        <BsTrash3Fill className="text-red-500" title="Xóa" />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-2">
          <span>Thêm này nghỉ: </span>
          <div>
            <Input type="date" value={date} onChange={(e) => handleChangeDateOff(e.target.value)} />
          </div>
          {disabledSaveDateOff || (
            <Button onClick={() => handleSaveDateOff()} title="Lưu">
              <BsCheck2All className="text-blue-500 text-xl" />
            </Button>
          )}
        </div>
      </div>
      <Confirm
        message={`Xác nhận xóa ngày nghỉ ${deleteDate !== '' && deleteDate.toLocaleDateString('en-GB')}`}
        isShow={showRemoveConfirm}
        handleConfirm={() => handleRemoveDate(deleteDate)}
        handleClose={() => setShowRemoveConfirm(false)}
      />
    </>
  )
}
