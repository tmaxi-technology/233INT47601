import React from 'react'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Delete = (props) => {

  return (
    // <!-- Modal -->
   <Modal show={props.setshowDelete} onHide={props.handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          bạn có chắc muốn xoá ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseDelete}>
            Đóng
          </Button>
          <Button variant="danger" onClick={props.deleteUser}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default Delete;