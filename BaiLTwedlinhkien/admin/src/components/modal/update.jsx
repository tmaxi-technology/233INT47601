import React from "react";
import "alertifyjs/build/css/alertify.css";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Update = (props) => {

  return (
    //    {/* <!-- Modal --> */}
    <Modal show={props.setshowUpdate} onHide={props.handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>{props.nameTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseUpdate}>
            Đóng
          </Button>
          <Button variant="primary" onClick={props.updateData}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default Update;
