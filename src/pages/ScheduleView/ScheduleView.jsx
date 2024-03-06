import { useEffect, useState } from 'react'
import UserService from '../../services/user-service'
import notificationService from '../../services/notificationService'
import { BsFileEarmarkArrowDownFill } from 'react-icons/bs'
import Button from '../../components/UI/Button'
import Loading from '../../components/Loading'
import Input from '../../components/UI/Input'

export default function ScheduleView() {
  const [loading, setLoading] = useState(true)
  const [weekTotal, setWeekTotal] = useState(0)
  const [dateStart, setDateStart] = useState(new Date())
  const [room, setRoom] = useState([])
  const [schedule, setSchedule] = useState([])
  const [session, setSession] = useState('Morning')
  const [semester, setSemester] = useState('')

  useEffect(() => {
    UserService.getSchedule(1)
      .then((response) => {
        var data = response.data
        setWeekTotal(data.sotuan)
        setDateStart(data.ngaybatdau)
        setRoom(data.phong)
        setSemester(data.hknh)

        setSchedule(data.lichThucHanhs)
        setLoading(false)
      })
      .catch((er) => {
        setLoading(false)
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
      })
  }, [])

  const handleChangeSession = (e) => {
    setSession(e.target.value)
  }

  const handleChangeWeek = (e) => {
    const data = e.target.value
    UserService.getSchedule(data)
      .then((response) => {
        var data = response.data
        setSchedule(data.lichThucHanhs)
        setDateStart(data.ngaybatdau)
      })
      .catch((er) => notificationService.Warning('Có lỗi xảy ra: ' + er.message))
  }

  const downloadSchedule = () => {
    UserService.downloadSchedule()
      .then((res) => {
        const blobURL = window.URL.createObjectURL(res.data)

        const a = document.createElement('a')
        a.href = blobURL
        a.download = 'LichThucHanh.xlsx'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(blobURL)
      })
      .catch((er) => {
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
        console.log(er)
      })
  }

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex justify-start items-center sticky top-16 h-16 space-x-2 bg-slate-100 dark:bg-zinc-600">
          <select
            onChange={handleChangeWeek}
            className="border rounded-sm border-gray-400 w-44 p-1 outline-none cursor-pointer dark:bg-zinc-800 dark:text-gray-300"
          >
            {[...Array(weekTotal)].map((_, i) => (
              <option key={i} value={i + 1}>
                Tuần {i + 1}
              </option>
            ))}
          </select>
          {/* <select
          onChange={handleChangeSession}
          className="border rounded-sm border-gray-400 p-1 outline-none cursor-pointer mx-2 dark:bg-zinc-800 dark:text-gray-300"
        >
          <option value="Morning">Buổi sáng</option>
          <option value="Afternoon">Buổi chiều</option>
        </select> */}
          <div className="flex flex-col">
            <label className="space-x-1">
              <Input type="radio" name="session" value="Morning" defaultChecked onClick={handleChangeSession} />
              <span>Sáng</span>
            </label>
            <label className="space-x-1">
              <Input type="radio" name="session" value="Afternoon" onClick={handleChangeSession} />
              <span>Chiều</span>
            </label>
          </div>
          <Button onClick={downloadSchedule} title="Tải về lịch thực hành" className="dark:text-gray-300">
            <BsFileEarmarkArrowDownFill className="text-2xl" />
          </Button>
        </div>
        <div>
          Học kỳ hiện tại: <span className="italic font-medium">{semester}</span>
        </div>
      </div>

      <div className="overflow-auto h-full-minus-header">
        <table className="w-full overflow-y-hidden text-center text-base bg-white dark:bg-zinc-800 dark:text-gray-300">
          <thead className="bg-gray-500 text-gray-200 dark:text-gray-300 sticky top-0">
            <tr>
              <th rowSpan="2">Phòng</th>
              <th>Thứ 2</th>
              <th>Thứ 3</th>
              <th>Thứ 4</th>
              <th>Thứ 5</th>
              <th>Thứ 6</th>
              <th>Thứ 7</th>
              <th>Chủ nhật</th>
            </tr>
            <tr className="text-xs">
              {[...Array(7)].map((_, i) => {
                const currentDate = new Date(dateStart)
                currentDate.setDate(currentDate.getDate() + i)

                return <td key={i}>{currentDate.toLocaleDateString('en-GB')}</td>
              })}
            </tr>
          </thead>
          <tbody>
            {room.map((item, i) => (
              <tr key={i}>
                <td>{item}</td>
                {[...Array(7)].map((_, i) => {
                  const currentDate = new Date(dateStart)
                  currentDate.setDate(currentDate.getDate() + i)

                  return (
                    <td key={i} className="text-xs text-slate-600 p-2">
                      {schedule.map((itemSchedule, i) => {
                        const d = new Date(itemSchedule.ngaythuchanh)
                        if (
                          itemSchedule.buoi === session &&
                          d.getTime() === currentDate.getTime() &&
                          itemSchedule.phong === item
                        ) {
                          return (
                            <p key={i} className="dark:text-gray-300">
                              {itemSchedule.manhomhp} - {itemSchedule.tenhp} <br /> {itemSchedule.hoten}
                            </p>
                          )
                        }
                        return null
                      })}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
