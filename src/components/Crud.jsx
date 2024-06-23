import React, { useEffect, useState } from 'react'
import './Crud.css'
import userData from '../components/data'
import {v4} from 'uuid'


export const Crud = () => {
    const [data, setData] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState()
    const [id, setId] = useState('')
    const uniqueId= v4();
    console.log(uniqueId);

    const [isEnable, setIsEnable] = useState(false)
    useEffect(() => {
      setData(userData)
    }, [])


    // delete start here
    const handleDelete=(id,name)=>{
        if(window.confirm("Confirm Delete")){
        const updateData= data.filter(item=> item.id !== id)
        setData(updateData)
        }
    }
    // delete ends here


    // Edit start here
    const handleEdit=(id)=>{
        const updateData= data.filter(item => item.id === id);
        if(updateData !== undefined){
            setId(id)
            setFirstName(updateData[0].firstName)
            setLastName(updateData[0].lastName)
            setAge(updateData[0].age)
            setIsEnable(true)
        }
    }
    // Edit ends here

    // Update start here
    const handleUpdate=()=>{
        const index= data.map((item)=>{
            return item.id
        }).indexOf(id)

        const updateData= [...data];
        updateData[index].firstName= firstName;
        updateData[index].lastName = lastName;
        updateData[index].age = age;

        setData(updateData);
        handleClear()
    }
    // Update ends here

    // Add New Item start here
    const handleAddNew=(e)=>{
        const error= alert('All Feilds are required!')

        if(firstName=== ''){
            return error
        }
        if(lastName=== ''){
            return error
        }
        if(age=== ''){
            return error
        }
        e.preventDefault();
        const updateData= [...data];
        const newData={
            id: uniqueId,
            firstName: firstName,
            lastName: lastName,
            age:age
        }

        updateData.push(newData);
        setData(updateData);
        handleClear();
    }
    // Add New Item ends here

    // Clear start here
    const handleClear=()=>{
        setFirstName("")
        setLastName("")
        setAge('')
        setIsEnable(false)
    }
    // Clear ends here

    
  return (
    <>
        <section className='mainSection'>
            {/* Form section Start here*/}
                <div className="formControl">
                    <div className='inputFeilds'>
                       
                        <input  type="text" placeholder='Enter First Name' required onChange={(e=>setFirstName(e.target.value))} value={firstName} />
                        <input  type="text" placeholder='Enter Last Name' required onChange={(e=>setLastName(e.target.value))} value={lastName}/>
                        <input  type="number" placeholder='Enter Age' required  onChange={(e=>setAge(e.target.value))} value={age}/>
                    </div>
                    <div className='btns'>
                    {
                            !isEnable
                            ?
                            <button className='btn1' onClick={(e)=> handleAddNew(e)}>Save</button>
                            :
                            <button className='btn2' onClick={()=> handleUpdate()}>Update</button>

                        }
                        
                        
                        <button className='btn3' onClick={(e)=>handleClear(e)}>Clear</button>
                    </div>
                </div>       
            {/* Form section Ends here*/}


            {/* Table section Start here */}

            <section className='dataTable'>
                <h1>List of Data</h1>

                        <table className='mainTable'>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   data && data.map((item)=>{
                                        return(
                                            <tr key={v4()} >
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.age}</td>
                                                <td>
                                                    <button className='btn btn1' onClick={()=>handleEdit(item.id)}>Edit</button>
                                                    <button className='btn btn3' onClick={()=> handleDelete(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
            </section>
            {/* Table section Ends here */}
            

         </section>



    </>
  )
}
