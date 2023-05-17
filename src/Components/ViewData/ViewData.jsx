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

function ViewData() {

    const navigate = useNavigate();
    const [initial, setInitial] = useState({
        name: '',
        email: ''
    });
    const [storedata, setStoredata] = useState(GetList());
    const [editinput, setEditInput] = useState(false);
    const [editinitial, setEditInitial] = useState({
        name: '',
        email: '',
        mobile: ''
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
            name: '',
            email: '',
            mobile: ''
        });
        navigate("/ViewData")
    }

    const handleEdit = (index, value) => {
        setEditInput(true);
        setEditInitial(value);
        setIndexId(index);
    }

    const handleSave = (index) => {
        setEditInput(false)
        setEditInitial({
            name: '',
            email: '',
            mobile: ''
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
        localStorage.setItem('MyForm', JSON.stringify(storedata))
    }, [storedata])

    return (
        <div>

           
        </div>
    )
}

export default ViewData
