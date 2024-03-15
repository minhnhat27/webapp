import { useEffect, useState } from 'react'
import SemesterManagement from '../../../services/admin/semesterManagement'
import { BsPencilFill } from 'react-icons/bs'

import Button from '../../../components/UI/Button'
import Input from '../../../components/UI/Input'
import notificationService from '../../../services/notificationService'
import DateOff from './DayOff'

export default function Semester() {
  const [semesters, setSemesters] = useState([])
  const [currentSemester, setCurrentSemester] = useState({})

  const [startDate, setStartDate] = useState('')
  const [disabledSelectSemester, setDisabledSelectSemester] = useState(true)
  useEffect(() => {
    SemesterManagement.getSemesters().then((res) => {
      const data = res.data
      setSemesters(data)
      data.forEach((e) => {
        if (e.currentSemester) {
          setCurrentSemester(e)
          setStartDate(e.startDate.slice(0, 10))
        }
      })
    })
  }, [disabledSelectSemester])

  const handleChangeSemester = (id) => {
    SemesterManagement.setCurrentSemester({ id: id })
      .then(() => {
        notificationService.Success('Đã cập nhật học kỳ')
        setDisabledSelectSemester(true)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra. Vui lòng thử lại'))
  }

  const handleChangeStartDate = (value) => {
    const data = { date: new Date(value).toLocaleDateString('af-ZA') }
    SemesterManagement.setStartDate(data)
      .then(() => {
        notificationService.Success('Đã cập nhật ngày bắt đầu học kỳ')
        setStartDate(value)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra. Vui lòng thử lại'))
  }

  return (
    <>
      <div className="space-y-2">
        <div className="flex space-x-2">
          <span>Học kỳ hiện tại: </span>
          <select
            disabled={disabledSelectSemester}
            onChange={(e) => handleChangeSemester(e.target.value)}
            value={currentSemester.id}
            className="outline-none border rounded-sm font-medium text-fuchsia-950"
          >
            {semesters.map((item, i) => {
              if (item.currentSemester) {
                return (
                  <option key={i} value={item.id} className="italic font-medium">
                    Học kỳ {item.id[item.id.length - 1]} - {item.id.substring(0, item.id.indexOf('_'))}
                  </option>
                )
              }

              return (
                <option key={i} value={item.id}>
                  Học kỳ {item.id[item.id.length - 1]} - {item.id.substring(0, item.id.indexOf('_'))}
                  {/* {item.id} */}
                </option>
              )
            })}
            <option disabled>...</option>
          </select>

          {disabledSelectSemester && (
            <Button title="Chỉnh sửa" onClick={() => setDisabledSelectSemester(false)}>
              <BsPencilFill className="text-blue-500" />
            </Button>
          )}
        </div>
        <div className="flex space-x-2">
          <span>Ngày bắt đầu: </span>
          <div>
            <Input type="date" value={startDate} onChange={(e) => handleChangeStartDate(e.target.value)} />
          </div>
        </div>
      </div>
      <DateOff />
    </>
  )
}
