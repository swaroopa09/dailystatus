import React, { useState } from "react";
import { Modal, Button, Table, Form, Row, Col } from "react-bootstrap";
import "./StatusForm.css";

const StatusForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    srNo: 1,
    date: "",
    slot1: "",
    slot2: "",
    slot3: "",
  });

  const handleShowModal = () => {
    setEditIndex(null);
    setFormData({ srNo: tasks.length + 1, date: "", slot1: "", slot2: "", slot3: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveTask = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = formData;
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, { ...formData, srNo: tasks.length + 1 }]);
    }
    setShowModal(false);
  };

  const handleEditRow = (index) => {
    setEditIndex(index);
    setFormData(tasks[index]);
    setShowModal(true);
  };

  const handleTableEdit = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-4 text-center">
      <Button className="dsr-status-btn" onClick={handleShowModal}>
        Status
      </Button>

      {/* Table Displaying Tasks */}
      <div className="dsr-table-container">
        <Table bordered className="dsr-status-table">
          <thead>
            <tr>
              <th rowSpan="2">Sr No</th>
              <th rowSpan="2">Date</th>
              <th colSpan="1" className="text-center">Slot 1 (10:00 am - 1:30 pm)</th>
              <th colSpan="1" className="text-center">Slot 2 (2:30 pm - 4:30 pm)</th>
              <th colSpan="1" className="text-center">Slot 3 (5:00 pm - 7:00 pm)</th>
            </tr>
            <tr>
              <th>Task Done</th>
              <th>Task Done</th>
              <th>Task Done</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} onClick={() => handleEditRow(index)}>
                <td>{task.srNo}</td>
                <td>
                  <input
                    type="date"
                    value={task.date}
                    className="dsr-table-input"
                    onChange={(e) => handleTableEdit(index, "date", e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    value={task.slot1}
                    className="dsr-table-textarea"
                    onChange={(e) => handleTableEdit(index, "slot1", e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    value={task.slot2}
                    className="dsr-table-textarea"
                    onChange={(e) => handleTableEdit(index, "slot2", e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    value={task.slot3}
                    className="dsr-table-textarea"
                    onChange={(e) => handleTableEdit(index, "slot3", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Adding/Editing Tasks */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Task" : "Add Task"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-2 dsr-d-flex">
              <Col xs={4} className="dsr-form-label">Date</Col>
              <Col xs={8}>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleInputChange} />
              </Col>
            </Row>

            <Row className="mb-2 dsr-d-flex">
              <Col xs={4} className="dsr-form-label">Slot 1 Task</Col>
              <Col xs={8}>
                <Form.Control type="text" name="slot1" value={formData.slot1} onChange={handleInputChange} />
              </Col>
            </Row>

            <Row className="mb-2 dsr-d-flex">
              <Col xs={4} className="dsr-form-label">Slot 2 Task</Col>
              <Col xs={8}>
                <Form.Control type="text" name="slot2" value={formData.slot2} onChange={handleInputChange} />
              </Col>
            </Row>

            <Row className="mb-2 dsr-d-flex">
              <Col xs={4} className="dsr-form-label">Slot 3 Task</Col>
              <Col xs={8}>
                <Form.Control type="text" name="slot3" value={formData.slot3} onChange={handleInputChange} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="dsr-modal-footer-centered">
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveTask}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StatusForm;
