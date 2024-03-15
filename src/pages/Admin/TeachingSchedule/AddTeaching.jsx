import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import InsideLoading from '../../../components/Loading/InsideLoading'
import Wrapper from '../../../components/Wrapper'
import Button from '../../../components/UI/Button'
import TeachingManagementService from '../../../services/admin/teachingManagement'
import notificationService from '../../../services/notificationService'

export default function AddTeaching({ isAddTeaching, setIsAddTeaching, userId, update, setUpdate }) {
  const nodeRef = useRef()
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState([])
  const [courseGroups, setCourseGroups] = useState([])

  const [courseId, setCourseId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm()

  useEffect(() => {
    TeachingManagementService.getCourses()
      .then((res) => {
        setCourses(res.data)
        setCourseId(res.data[0].id)
      })
      .catch(() => notificationService.Warning('Có lỗi xảy ra'))
  }, [userId])

  useEffect(() => {
    if (courseId !== '') {
      TeachingManagementService.getCourseGroups({ id: courseId })
        .then((res) => {
          setCourseGroups(res.data)
        })
        .catch(() => notificationService.Warning('Có lỗi xảy ra'))
    }
  }, [courseId, userId, update])

  const onSelectCourse = (data) => setCourseId(data)

  const handleSubmitAddTeaching = () => {
    setLoading(true)
    const data = {
      userId: userId,
      ...getValues(),
    }
    console.log(data)
    TeachingManagementService.addTeaching(data)
      .then(() => {
        notificationService.Success('Đã thêm học phần giảng dạy cho cán bộ ' + userId)
        setLoading(false)
        setIsAddTeaching(false)
        setUpdate(!update)
        reset()
      })
      .catch(() => {
        notificationService.Warning('Có lỗi xảy ra')
        setUpdate(!update)
        setLoading(false)
      })
  }

  return (
    <CSSTransition nodeRef={nodeRef} in={isAddTeaching} timeout={300} unmountOnExit classNames="my-node">
      <div
        ref={nodeRef}
        className="bg-gray-300 bg-opacity-90 fixed top-0 w-full h-full flex items-center justify-center z-10"
      >
        <div className="border rounded-md lg:w-2/5 md:w-1/2 sm:w-3/4 w-11/12 max-h-screen overflow-auto">
          {loading && <InsideLoading />}
          <Wrapper className="p-4 h-full bg-gray-100">
            <form onSubmit={handleSubmit(handleSubmitAddTeaching)} method="POST" className="space-y-2">
              <div>
                <span>Học phần</span>
                <select
                  onChange={(e) => onSelectCourse(e.target.value)}
                  className="w-full overflow-auto p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                >
                  {courses.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.id} - {item.courseName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span>Mã nhóm học phần</span>
                <select
                  disabled={courseGroups.length === 0}
                  defaultValue={courseGroups[0] ?? ''}
                  className="w-full overflow-auto p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                  {...register('courseGroups', { required: 'Vui lòng chọn mã nhóm' })}
                >
                  {courseGroups.map((item, i) => (
                    <option key={i} value={item.id}>
                      {item.id}
                    </option>
                  ))}
                </select>

                {courseGroups.length === 0 && <span className="text-xs text-red-500">Nhóm học phần đã hết</span>}
                <span className="text-xs text-red-500">{errors.courseGroups && errors.courseGroups.message}</span>
              </div>

              <div>
                <span>Số buổi thực hành</span>
                <select
                  disabled={courseGroups.length === 0}
                  className="w-full overflow-auto p-2 border rounded-md outline-slate-300 dark:bg-gray-700 dark:text-gray-300"
                  {...register('numberOfSessions', { required: 'Vui lòng chọn số buổi thực hành' })}
                >
                  {courseGroups.length === 0 ||
                    [...Array(15)].map((_, i) => {
                      return (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      )
                    })}
                </select>
                <span className="text-xs text-red-500">
                  {errors.numberOfSessions && errors.numberOfSessions.message}
                </span>
              </div>

              <div className="flex justify-center space-x-2 text-white">
                <Button
                  disabled={courseGroups.length === 0}
                  type="submit"
                  className={`border p-2 rounded-md ${courseGroups.length === 0 ? 'bg-blue-300' : 'bg-blue-500'}`}
                >
                  Thêm
                </Button>
                <Button
                  type="button"
                  className="border p-2 rounded-md bg-gray-500"
                  onClick={() => setIsAddTeaching(false)}
                >
                  Đóng
                </Button>
              </div>
            </form>
          </Wrapper>
        </div>
      </div>
    </CSSTransition>
  )
}
