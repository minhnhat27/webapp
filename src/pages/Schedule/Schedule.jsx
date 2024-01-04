import { useState } from 'react'
import { useEffect } from 'react'

import Wrapper from '../../components/Wrapper'
import UserService from '../../services/user-service'
import Loading from '../../components/Loading'
import notificationService from '../../services/notificationService'

export default function Schedule() {
  const [loading, setLoading] = useState(true)
  const [teaching, setTeaching] = useState([])
  const [schedule, setSchedule] = useState([])
  const [week, setWeek] = useState(0)
  const [dateStart, setDateStart] = useState(new Date())
  const [semester, setSemester] = useState('')
  const [dayOff, setDayOff] = useState([])

  useEffect(() => {
    UserService.getTeaching()
      .then((response) => {
        const data = response.data
        setTeaching(data.giangDays)
        setSchedule(data.lichThucHanhs)
        setWeek(data.sotuan)

        const dStart = new Date(data.ngaybatdauhk)
        dStart.setHours(0)
        setDateStart(dStart)

        setSemester(data.hknh)
        const DOff = []
        data.ngaynghis.forEach((item) => {
          const d = new Date(item)
          DOff.push(d.getTime())
        })
        setDayOff(DOff)
        setLoading(false)
      })
      .catch((er) => {
        setLoading(false)
        notificationService.Warning('Có lỗi xảy ra: ' + er.message)
      })
  }, [])

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text', e.target.id)
  }

  const handleDragOver = (e) => {
    if (e.target.draggable) {
      return
    } else {
      e.preventDefault()
    }
  }

  const handleDragOverTable = (e) => {
    if (e.target.childElementCount > 0 || e.target.draggable) {
      return
    } else {
      e.preventDefault()
    }
  }

  const saveSchedule = (item) => {
    const parent = item.parentNode
    const data = {
      ngaythuchanh: parent.getAttribute('data-ngay'),
      buoi: parent.getAttribute('data-buoi'),
      sotuan: parent.getAttribute('data-tuan'),
      hknk: semester,
      sttbuoithuchanh: item.getAttribute('data-stt'),
      manhomhp: item.getAttribute('data-manhom'),
    }
    UserService.saveSchedule(data)
      .then(
        () => notificationService.Success('Thêm lịch thành công'),
        () => notificationService.Danger('Thêm lịch thất bại'),
      )
      .catch((er) => notificationService.Warning('Có lỗi xảy ra: ' + er.message))
  }

  const removeSchedule = (item) => {
    const data = {
      hknk: semester,
      sttbuoithuchanh: item.getAttribute('data-stt'),
      manhomhp: item.getAttribute('data-manhom'),
    }
    UserService.updateOnSchedule(data)
      .then(
        () => notificationService.Success('Đã xóa lịch'),
        () => notificationService.Danger('Xóa lịch thất bại'),
      )
      .catch((er) => notificationService.Warning('Có lỗi xảy ra: ' + er.message))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const item = document.getElementById(data)
    e.target.appendChild(item)
    removeSchedule(item)
  }

  const handleDropTable = (e) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text')
    const item = document.getElementById(data)
    e.target.appendChild(item)
    saveSchedule(item)
  }

  if (loading) {
    return <Loading />
  } else
    return (
      <>
        <div className="flex sm:space-x-2 pb-2">
          <div className="w-56 sm:block hidden">
            <Wrapper
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              id="list"
              className="sticky space-y-2 px-4 top-16 min-w-40 max-h-96 min-h-36 overflow-auto text-base p-2 dark:bg-zinc-600"
            >
              {teaching.map((item, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={handleDragStart}
                  className="item text-center cursor-pointer rounded-md m-1 p-2 text-xs border border-slate-300 bg-slate-100 text-black hover:bg-slate-300 dark:bg-gray-300 dark:hover:bg-slate-400"
                  id={`${item.sttbuoithuchanh}${item.manhomhp}`}
                  data-stt={item.sttbuoithuchanh}
                  data-manhom={item.manhomhp}
                >
                  Buổi {item.sttbuoithuchanh} {item.manhomhp}
                </div>
              ))}
            </Wrapper>
          </div>

          <div className="w-full">
            <div className="space-y-3">
              {[...Array(week)].map((_, weekIndex) => (
                <div key={weekIndex} className="overflow-x-auto">
                  <table className="w-full text-base bg-white dark:bg-zinc-800 dark:text-gray-300">
                    <thead className="text-center">
                      <tr>
                        <th rowSpan="2">Tuần {weekIndex + 1}</th>
                        <th>T2</th>
                        <th>T3</th>
                        <th>T4</th>
                        <th>T5</th>
                        <th>T6</th>
                        <th>T7</th>
                        <th>CN</th>
                      </tr>
                      <tr className="text-xs">
                        {[...Array(7)].map((_, dayIndex) => {
                          const currentDate = new Date(dateStart)
                          currentDate.setDate(currentDate.getDate() * (weekIndex + 1) + dayIndex)

                          return <td key={dayIndex}>{currentDate.toLocaleDateString('en-GB')}</td>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-12">
                        <th>Sáng</th>
                        {[...Array(7)].map((_, dayIndex) => {
                          const currentDate = new Date(dateStart)
                          currentDate.setDate(currentDate.getDate() * (weekIndex + 1) + dayIndex)

                          if (dayOff.includes(currentDate.getTime())) {
                            return <td key={dayIndex} className="bg-slate-500"></td>
                          } else
                            return (
                              <td
                                key={dayIndex}
                                onDrop={handleDropTable}
                                onDragOver={handleDragOverTable}
                                data-buoi="Morning"
                                data-ngay={currentDate.toLocaleDateString('ko-KR')}
                                data-tuan={weekIndex + 1}
                              >
                                {schedule.map((item, i) => {
                                  const d = new Date(item.ngaythuchanh)

                                  if (item.buoi === 'Morning' && d.getTime() === currentDate.getTime()) {
                                    return (
                                      <div
                                        key={i}
                                        draggable
                                        onDragStart={handleDragStart}
                                        className="item text-center cursor-pointer rounded-md m-1 p-2 text-xs border border-slate-300 bg-slate-100 text-black hover:bg-slate-300 dark:bg-gray-300 dark:hover:bg-slate-400"
                                        id={`${item.sttbuoithuchanh}${item.manhomhp}`}
                                        data-stt={item.sttbuoithuchanh}
                                        data-manhom={item.manhomhp}
                                      >
                                        Buổi {item.sttbuoithuchanh} {item.manhomhp}
                                      </div>
                                    )
                                  }
                                  return null
                                })}
                              </td>
                            )
                        })}
                      </tr>
                      <tr className="h-12">
                        <th>Chiều</th>
                        {[...Array(7)].map((_, dayIndex) => {
                          const currentDate = new Date(dateStart)
                          currentDate.setDate(currentDate.getDate() * (weekIndex + 1) + dayIndex)

                          if (dayOff.includes(currentDate.getTime())) {
                            return <td key={dayIndex} className="bg-slate-500"></td>
                          } else
                            return (
                              <td
                                key={dayIndex}
                                onDrop={handleDropTable}
                                onDragOver={handleDragOverTable}
                                data-buoi="Afternoon"
                                data-ngay={currentDate.toLocaleDateString('ko-KR')}
                                data-tuan={weekIndex + 1}
                              >
                                {schedule.map((item, i) => {
                                  const d = new Date(item.ngaythuchanh)

                                  if (item.buoi === 'Afternoon' && d.getTime() === currentDate.getTime()) {
                                    return (
                                      <div
                                        key={i}
                                        draggable
                                        onDragStart={handleDragStart}
                                        className="item text-center cursor-pointer rounded-md m-1 p-2 text-xs border border-slate-300 bg-slate-100 text-black hover:bg-slate-300 dark:bg-gray-300 dark:hover:bg-slate-400"
                                        id={`${item.sttbuoithuchanh}${item.manhomhp}`}
                                        data-stt={item.sttbuoithuchanh}
                                        data-manhom={item.manhomhp}
                                      >
                                        Buổi {item.sttbuoithuchanh} {item.manhomhp}
                                      </div>
                                    )
                                  }
                                  return null
                                })}
                              </td>
                            )
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
}
