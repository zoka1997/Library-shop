import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {
    const tableH = {
        color: "white",
        backgroundColor: "black",
    };


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [isActive, setIsActive] = useState(0);

    const [editId, setEditId] = useState('');
    const [editfirstName, setEditFirstName] = useState('');
    const [editlastName, setEditLastName] = useState('');
    const [editage, setEditAge] = useState('');
    const [editisActive, setEditIsActive] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    // Creating functions to call data api
    const getData = () => {
        axios.get(`https://localhost:7220/api/User`)
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
            console.log(error)
        })
    } 
    // End of creating functions to call data api

    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:7220/api/User/${id}`)
        .then((result) => {
            setEditFirstName(result.data.firstName);
            setEditLastName(result.data.lastName);
            setEditAge(result.data.age);
            setEditIsActive(result.data.isActive);
            setEditId(id);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this User library") === true) {
                axios.delete(`https://localhost:7220/api/User/${id}`)
            .then((result) => {
                  if(result.status === 200)
                  {
                    toast.success("User has been deleted");
                    getData();
                  }
            })
            .catch((error) => {
                toast.error(error);
            })
        }
    }   

    const handleUpdate = () => {
        const url = `https://localhost:7220/api/${editId}`;
        const data = {
            "id": editId,
            "firstName": editfirstName,
            "lastName": editlastName,
            "age": editage,
            "isActive": editisActive
        }

        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear();
            toast.success("User has been updated");
        }).catch((error) => {
            toast.error(error);
        })
    }

    const handleSave = () => {
        const url = `https://localhost:7220/api/User`;
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "age": age,
            "isActive": isActive
        }

        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success("User has been added");
        }).catch((error) => {
            toast.error(error);
        })
    }

    const clear = () => {
        setFirstName('');
        setLastName('');
        setAge('');
        setIsActive(0);
        setEditFirstName('');
        setEditLastName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');
    }

    const handleActiveChange = (e) => {
        if(e.target.checked) {
            setIsActive(1);
        } else {
            setIsActive(0);
        }
    }

    const handleEditActiveChange = (e) => {
        if(e.target.checked) {
            setEditIsActive(1);
        } else {
            setEditIsActive(0);
        }
    }

    return (
        <>
          <ToastContainer />
            {/* This is form component */}
            <Container>
                <Row>
                    <Col>
                        <input type="text" className='form-control' placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </Col>

                    <Col>
                        <input type="text" className='form-control' placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </Col>

                    <Col>
                        <input type="text" className='form-control' placeholder='Age' value={age} onChange={(e) => setAge(e.target.value)} />
                    </Col>

                    <Col>
                        <input type="checkbox"
                            checked={isActive === 1 ? true : false}
                            onChange={(e) => handleActiveChange(e)}
                            value={isActive}
                        />
                        <label>isActive</label>
                    </Col>

                    <Col>
                        <button className='btn btn-primary' onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            
            {/* This is form component */}
            <br />
            <Table responsive striped bordered hover>
                <thead style={tableH}>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>isActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.age}</td>
                                        <td>{item.isActive}</td>
                                        <td colSpan={2}>
                                            <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className='form-control' placeholder='Enter First Name' value={editfirstName} onChange={(e) => setEditFirstName(e.target.value)} />
                        </Col>

                        <Col>
                            <input type="text" className='form-control' placeholder='Enter Last Name' value={editlastName} onChange={(e) => setEditLastName(e.target.value)} />
                        </Col>

                        <Col>
                            <input type="text" className='form-control' placeholder='Age' value={editage} onChange={(e) => setEditAge(e.target.value)} />
                        </Col>

                        <Col>
                            <input type="checkbox"
                                checked={editisActive === 1 ? true : false}
                                onChange={(e) => handleEditActiveChange(e)}
                                value={editisActive}
                            />
                            <label>isActive</label>
                        </Col>

                        <Col>
                            <button className='btn btn-primary'>Submit</button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            </Container>
        </>
    );
}

export default CRUD;
