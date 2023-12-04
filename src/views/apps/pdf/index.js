import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import WebViewer from '@pdftron/webviewer'
import { checkedFile, sendStudentHomework } from '../user/store'
import { useDispatch } from 'react-redux'
import './style.scss'

const App = () => {
    const { id } = useParams()
    const viewer = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        let sended = false
        const url = id.split('-')
        const fileId = url[0]
        const homeworkId = url[1]
        const studentHomeworkId = url[2]

        WebViewer({ path: '/webviewer/lib' }, viewer.current).then(async instance => {
            instance.UI.loadDocument(`https://admin.smartstartnow.com/api/file/${fileId}`, {
                filename: 'document.pdf',
                customHeaders: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
                },
            })

            const { documentViewer, annotationManager, Annotations } = instance.Core
            instance.UI.setHeaderItems(header => {
                header.push({
                    type: 'actionButton',
                    title: 'Send pdf',
                    img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
                    onClick: async () => {
                        if (!sended) {
                            const doc = documentViewer.getDocument()
                            const xfdfString = await annotationManager.exportAnnotations()
                            const data = await doc.getFileData({
                                // saves the document with annotations in it
                                xfdfString,
                            })
                            const arr = new Uint8Array(data)
                            const blob = new Blob([arr], { type: 'application/pdf' })
                            const dataFile = new File([blob], 'filename', {
                                type: 'application/octet-stream',
                            })
                            if (userData.role === 'tutor') {
                                sended = true
                                dispatch(
                                    checkedFile({ file: dataFile, id: studentHomeworkId })
                                ).then(() => {
                                    navigate(`/class/list/studentsHomework/${homeworkId}`)
                                })
                            } else {
                                sended = true
                                dispatch(sendStudentHomework({ file: blob, id: homeworkId })).then(
                                    () => {
                                        navigate(`/class/list/subject/${url[2]}-${url[3]}`)
                                    }
                                )
                            }
                        }
                    },
                })
            })
        })
    }, [])

    return (
        <div className='pdf'>
            <div className='webviewer' ref={viewer}></div>
        </div>
    )
}

export default App
