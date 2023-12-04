// ** React Imports
import { useState, Fragment, useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem } from 'reactstrap'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { deletelecturePhoto, lectureShow } from '../../../apps/user/store'
import { useParams } from 'react-router-dom'

const FileUploaderMultiple = (props) => {
  // ** State
  const [files, setFiles] = useState([])
  const [editCheck, setEditCheck] = useState(true)
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const {id} = useParams()
  const courseId = id.split("-")
  const store = useSelector(state => state.users)

 
  const handleFooterAlert = () => {
    return MySwal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You can only upload a pdf file!',
      customClass: {
        confirmButton: 'btn btn-primary'
      },
      buttonsStyling: false
    })
  }


  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setEditCheck(false)
      props.setCheck(true)
      const typeFile = acceptedFiles[0].name.split(".")
      let type = ""
      if (window.location.href.includes("addHomework") || window.location.href.includes("homeworkEdit")) { 
        if (typeFile[typeFile.length-1] === "pdf") {
          setFiles([])
          setFiles([...[], ...acceptedFiles.map(file => Object.assign(file))])
        } else{
          setFiles([])
          handleFooterAlert()
        }
        
      } else {
         setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
      }
    }
  })

  const renderFilePreview = file => {
    if (file?.type === 'image') {
      return <>
      <img className='rounded' alt={file?.name} src={(file.url &&  `data:image/png;base64, ${file.url}`) || file.name && URL.createObjectURL(file) } height='28' width='28' />
      </>
    } else if (file.type === "video") {
      return <>
                <video  className="img-fluid mx-auto d-block mb-0" width="50" height="50">
                    <source src={file.url}/>
                </video>
              </>
    } else {
      return <>
             <a href={file.url} className="d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path fill="#9c4854" d="M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.166h.334a1.167 1.167 0 0 0 0-2.334H6.5Zm.834 1.334H7V12h.334a.167.167 0 0 1 0 .334ZM12 11.499a.5.5 0 0 1 .5-.499h.998a.5.5 0 1 1 0 1H13v.335h.498a.5.5 0 1 1 0 1H13v.164a.5.5 0 1 1-1 .002v-.667l.002-1.335ZM9.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h.502a1.5 1.5 0 0 0 0-3H9.5Zm.5 2v-1h.002a.5.5 0 0 1 0 1H10Zm.002-6.5V2H5.5A1.5 1.5 0 0 0 4 3.5v5.582a1.5 1.5 0 0 0-1 1.414v4.003a1.5 1.5 0 0 0 1 1.414v.587A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-.587a1.5 1.5 0 0 0 .998-1.414v-4.003A1.5 1.5 0 0 0 16 9.082V8h-4.5A1.5 1.5 0 0 1 10 6.5Zm-5.5 3.496h10.997a.5.5 0 0 1 .5.5v4.003a.5.5 0 0 1-.5.5H4.502a.5.5 0 0 1-.5-.5v-4.003a.5.5 0 0 1 .5-.5ZM11 6.5V2.25L15.75 7H11.5a.5.5 0 0 1-.5-.5Z"/></svg>
            </a>
            </>
    }
  }

  const handleRemoveFile = file => {
    if ((window.location.href.includes("edit")) && file.path2) {
      return MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ms-1'
        },
        buttonsStyling: false
      }).then(function (result) {
        if (result.value) {
          if (window.location.href.includes("edit")) {
            dispatch(deletelecturePhoto({id:file.fileId, courseId:courseId[0], lectureId:courseId[1]}))
          } 
            setEditCheck(true)
            props.setCheck(true)
          MySwal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        }
      })

    }
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => {
     return  file.lastModified !== i.lastModified})
    setFiles([...filtered])
  }

  const fileList = files?.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file?.title || file.name}</p>
        </div>
      </div>
      <Button color='danger' outline size='sm' className='btn-icon' style={{display: window.location.href.includes("homeworkEdit") ? "none" : "block"}} onClick={() => handleRemoveFile(file)}>
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

  useEffect(() => {
    if (window.location.href.includes("homeworkEdit") && (editCheck === true || props.deleteData === false)) {
      setEditCheck(false)
     
      const defaultMedia = [{...store.homeworkState, path2:store.homeworkState.url}]
      
      setFiles(defaultMedia)
    } else if (window.location.href.includes("edit") && (editCheck === true || props.deleteData === false)) {
        setEditCheck(false)
        const defaultMedia  = store.photoAll.map(el => {
          return {...el, path2:el.url}
        })
        setFiles(defaultMedia)
      }
    }, [store.photoAll, dispatch, props.deleteData, store.homeworkState])

  useEffect(() => {
    const data = files?.filter(el => {
  
      if (!el.path2){
        return el
      }
    })
    props.setMedia(files)
    props.setMedia2(data)
  }, [files])
  return (
   
       <div style={{border:"1px solid #D8D6DE", borderRadius:"8px"}} className="p-5">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className='d-flex align-items-center justify-content-center flex-column'>
            <DownloadCloud size={64} />
            <h5>Drop Files here or click to upload</h5>
            <p className='text-secondary'>
              Drop files here or click{' '}
              <a href='/' onClick={e => e.preventDefault()}>
                browse
              </a>{' '}
              thorough your machine
            </p>
          </div>
        </div>
        {files?.length ? (
          <Fragment>
            <ListGroup className='my-2'>{fileList}</ListGroup>
            <div className='d-flex justify-content-end'></div>
          </Fragment>
        ) : null}</div>
  )
}

export default FileUploaderMultiple
