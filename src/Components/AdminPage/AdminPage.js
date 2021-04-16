import React, { useState, useEffect } from 'react'
import classes from './AdminPage.module.css'
import { data } from '../Constant'

const AdminPage = () => {
    const [masterData, setmasterData] = useState([])
    const [newInput, setnewInput] = useState({ "name": "", "description": "", "price": 0, "quantity": 0 })
    const [edit, setedit] = useState()
    const [showInputCard, setshowInputCard] = useState(false)
    useEffect(() => {
        // api call to get data
        setmasterData(data)
        // api call to get data
    }, [])
    const inputChangeHandler = (e) => {
        var temp = newInput
        temp[e.target.id] = (e.target.id === "price" || e.target.id === "quantity") ? parseInt(e.target.value) : e.target.value
        setnewInput(temp)
    }
    const submitHandler = (e) => {
        if (!isDuplicate(newInput)) {
            if (isFieldsValid(newInput)) {
                setmasterData([...masterData, newInput])
                setshowInputCard(false)
                setnewInput({
                    "name": "", "description": "", "price": 0, "quantity": 0
                })
            }
            else {
                alert("Please fill all fields")
            }
        }
        else {
            alert("This entry already exists. Kindly edit the existing entry")
        }
    }
    const deleteHandler = (e, item) => {
        var temp = masterData
        var list = []
        temp.map(value => {
            if (value.name !== item.name && value.price !== item.price) {
                list.push(value)
            }
        })
        setmasterData(list)
    }
    const editinputHandler = (e, item) => {
        item[e.target.name] = e.target.name === "price" ? parseInt(e.target.value) : e.target.value
    }
    const submitEdit = (e, item) => {
        if (isFieldsValid(item)) {
            setedit()
            console.log(masterData)
        }
        else {
            alert("Please fill all fields")
        }
    }
    const isFieldsValid = (lineItem) => {
        if (lineItem.name === '' || lineItem.name === undefined || lineItem.description === "" || lineItem.price === 0 || lineItem.price === '' ||
            lineItem.price === null) {
            return false
        }
        else {
            return true
        }
    }
    const isDuplicate = (lineItem) => {
        var temp = masterData
        var flag = []
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].name === lineItem.name && temp[i].price === lineItem.price) {
                flag.push("this is duplicate")
            }
        }
        if (flag.length > 0) {
            return true
        }
        else {
            return false
        }
    }
    return (
        <div>
            <div className="row">


            </div>
            <div className={classes['container']}>
                {masterData.length > 0 ?
                    <>
                        <div class={classes["data-card"]}>
                            <div class="card-body">
                                {showInputCard ?
                                    <>
                                        <p class={classes['new-input-p']}>
                                            <input className={classes['new-input']} type="text" id="name" placeholder="Product name" onChange={e => inputChangeHandler(e)} />
                                        </p>
                                        <p class={classes['new-input-p']}>
                                            <input className={classes['new-input']} type="text" id="description" placeholder="Product description" onChange={e => inputChangeHandler(e)} />
                                        </p>
                                        <p class={classes['new-input-p']}>
                                            <input className={classes['new-input']} type="number" id="price" placeholder="Product price" onChange={e => inputChangeHandler(e)} />
                                        </p>
                                        <p class={classes['new-input-p']}>
                                            <input className={classes['new-input']} placeholder="Quantity" id="quantity" onChange={e => inputChangeHandler(e)} />
                                        </p>
                                        <button style={{ marginTop: '2%' }} className="btn btn-success" onClick={e => submitHandler(e)}>Submit</button>
                                    </>
                                    :
                                    <div onClick={e => setshowInputCard(true)} class={classes["circle"]}></div>
                                }



                            </div>
                        </div>
                        {masterData.map((item, index) => (
                            <>
                                {
                                    index === edit ?
                                        <div class={classes["data-card"]}>
                                            <div class="card-body">
                                                <i onClick={e => submitEdit(e, item)} className="fa fa-check" style={{ color: 'green', float: 'right', cursor: 'pointer',fontSize:'x-large' }} />
                                                <br />
                                                <p class={classes['new-input-p']}>
                                                    <input className={classes['edit-input']} placeholder="Product name" name="name" defaultValue={item.name} onChange={e => editinputHandler(e, item)} />
                                                </p>
                                                <p class={classes['new-input-p']}>
                                                    <input className={classes['edit-input']} placeholder="Product description" name="description" defaultValue={item.description} onChange={e => editinputHandler(e, item)} />
                                                </p>
                                                <p class={classes['new-input-p']}><input className={classes['edit-input']} placeholder="Product price" name="price" defaultValue={item.price} onChange={e => editinputHandler(e, item)} />
                                                </p>
                                                <p class={classes['new-input-p']}>
                                                    <input className={classes['edit-input']} placeholder="Quantity" name="quantity" defaultValue={item.quantity} onChange={e => editinputHandler(e, item)} />
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div class={`${classes["data-card"]} `}>
                                            <div class="card-body">
                                                <span style={{ float: 'left' }}>Oty:{item.quantity}</span>
                                                <i title="Click to delete the product" onClick={e => deleteHandler(e, item)} style={{ float: 'right', cursor: 'pointer', color: 'red', fontSize: 'large' }} className="fa fa-trash"></i>
                                                <i title="Click to edit the values" onClick={e => setedit(index)} style={{ float: 'right', cursor: 'pointer', color: '#393186', marginRight: '3%', fontSize: 'large' }} className="fa fa-pencil" data-toggle="modal" data-target="#edit"></i> <br />
                                                <h5 class="card-title">{item.name}</h5>
                                                <p class="card-text">{item.description}</p>
                                                <b style={{ fontSize: 'xx-large' }}>&#8377;{item.price}</b>
                                            </div>
                                        </div>
                                }

                            </>
                        ))}

                    </>

                    :
                    null
                }

            </div>
        </div >
    )
}

export default AdminPage
