import React, { useEffect, useState } from 'react'
import { InputGroup, Table, Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const GetList = () => {
    const formdata = localStorage.getItem("ToDolist")
    if (formdata) {
        return JSON.parse(formdata)
    } else {
        return [];
    }
}

function Todo() {

    const navigate = useNavigate();
    const [initial, setInitial] = useState({
        productname: '',
        productdetails: '',
        productdescription: '',
        productprice: ''
    });
    const [storedata, setStoredata] = useState(GetList());
    const [editinput, setEditInput] = useState(false);
    const [editinitial, setEditInitial] = useState({
        productname: '',
        productdetails: '',
        productdescription: '',
        productprice: ''
    });
    const [indexId, setIndexId] = useState('');

    const ChangeInput = (e) => {
        const data = e.target.name;
        const value = e.target.value;
        if (editinput) {
            setEditInitial({ ...editinitial, [data]: value })
        }
        else {
            setInitial({ ...initial, [data]: value });
        }
    }

    const FormSubmit = (e) => {
        e.preventDefault();
        setStoredata([...storedata, initial]);
        setInitial({
            productname: '',
            productdetails: '',
            productdescription: '',
            productprice: ''
        });
    }

    const handleEdit = (index, value) => {
        setEditInput(true);
        setEditInitial(value);
        setIndexId(index);
    }

    const handleSave = (index) => {
        setEditInput(false)
        setEditInitial({
            productname: '',
            productdetails: '',
            productdescription: '',
            productprice: ''
        });
        const array = storedata;
        array[index] = editinitial
        setStoredata([...array])
    }


    const handleDelete = (index) => {
        const filterData = storedata.filter((el, id) => {
            return id !== index;
        })
        setStoredata(filterData);
    }

    // console.log(storedata);

    useEffect(() => {
        console.log("calll");
        localStorage.setItem('ToDolist', JSON.stringify(storedata))
    }, [storedata])


    return (
        <>
            <Container>
                <h1>To-Do-List</h1>
                <Form onSubmit={FormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" name='productname' value={initial.name} onChange={(e) => { ChangeInput(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Product Description </Form.Label>
                        <Form.Control type="mobile" placeholder="Enter your Mobile no" name='productdescription' value={initial.mobile} onChange={(e) => { ChangeInput(e) }} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Product Price </Form.Label>
                        <Form.Control type="mobile" placeholder="Enter your Mobile no" name='productprice' value={initial.mobile} onChange={(e) => { ChangeInput(e) }} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <br />
                <h1>List</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Description</th>
                            <th>Product Price</th>
                            <th>Edit Product</th>
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storedata.map((value, index) => {
                                return (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            {
                                                editinput && indexId == index ? <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name='productname'
                                                        value={editinitial.productname}
                                                        onChange={(e) => { ChangeInput(e) }}
                                                    />
                                                </InputGroup> : value.productname
                                            }
                                        </td>
                                        <td>
                                            {
                                                editinput && indexId == index ? <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name='productdescription'
                                                        value={editinitial.productdescription}
                                                        onChange={(e) => { ChangeInput(e) }}
                                                    />
                                                </InputGroup> : value.productdescription
                                            }
                                        </td>
                                        <td>
                                            {
                                                editinput && indexId == index ? <InputGroup className="mb-3">
                                                    <Form.Control
                                                        name='productprice'
                                                        value={editinitial.productprice}
                                                        onChange={(e) => { ChangeInput(e) }}
                                                    />
                                                </InputGroup> : value.productprice
                                            }
                                        </td>

                                        <td>
                                            {
                                                editinput && indexId == index ? <Button variant="primary" onClick={() => { handleSave(index, value) }}>Save</Button> : <Button variant="primary" onClick={() => { handleEdit(index, value) }}>Edit</Button>
                                            }
                                        </td>
                                        <td>
                                            {
                                                <Button variant="danger" onClick={() => { handleDelete(index) }}>Delete</Button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Todo;