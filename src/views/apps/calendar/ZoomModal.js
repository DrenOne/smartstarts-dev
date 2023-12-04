import { Button, Modal, ModalBody, ModalFooter } from "reactstrap"

const ZoomModal = ({ open, handleAddEventSidebar, data }) => {
  return (
   data &&  <Modal isOpen={open} toggle={handleAddEventSidebar} className='modal-dialog-centered'>
   <ModalBody className="pb-0">
     
    <h1>{data?.title?.split('(')[0]}</h1>
    <h6 className="p-0 m-0">Start time: {data.extendedProps.start_time}</h6>
    <h6 className="p-0 m-0">End time: {data.extendedProps.end_time}</h6>

   </ModalBody>
   <ModalFooter className="my-0 pt-0">
     <Button color='success' onClick={handleAddEventSidebar}>
       Join
     </Button>
   </ModalFooter>
 </Modal>
  )
}

export default ZoomModal
