// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Components
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'

import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import { useDispatch, useSelector } from 'react-redux'
import { lectureShow } from '../../../apps/user/store'
import { useParams } from 'react-router-dom'

// ** Reactstrap Imports
// import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const EditorControlled = (props) => {
  // ** State
  const [value, setValue] = useState(EditorState.createEmpty())
  const [checkEdit, setEditCheck] =useState(false)
  const dispatch  =useDispatch()
  const {id} = useParams()
  const courseId = id.split("-")
  const store = useSelector(state => state.users)

  useEffect(() => {
    // dispatch(lectureShow(courseId[1]))
  }, [checkEdit, dispatch])

  useEffect(() => {
    if (value && window.location.href.includes("homeworkEdit") && checkEdit === false && store.homeworkState.text) {
      setEditCheck(true)
      props.setCheck(true)
      setValue(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${store.homeworkState.text}`)
        )))
    }
    if (value && window.location.href.includes("edit") && checkEdit === false && store.lecture.text) {
      setEditCheck(true)
      props.setCheck(true)
      setValue(EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`${store.lecture.text}`)
        )))
    }
   
  }, [store.lecture, checkEdit, store.homeworkState.text])

useEffect(() => {
 props.setEditData(draftToHtml(convertToRaw(value.getCurrentContent())))
}, [value])

useEffect(() => {
  props.setEditData(draftToHtml(convertToRaw(value.getCurrentContent())))
 }, [])


useEffect(() => {
  if (props.deleteData) {
    setValue(EditorState.createEmpty())
  }
 }, [props.deleteData])
 

  return (
       <div style={{border:"1px solid #D8D6DE", borderRadius:"8px"}}>
         <Editor editorState={value} onEditorStateChange={data => {
            setValue(data)
            props.setCheck(true)
            }} id="consigne" name= "consigne" />
            
       </div>
  )
}

export default EditorControlled
