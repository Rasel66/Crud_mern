import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home = () => {
    const [ getUserData, setUserData ] = useState([]);
    console.log(getUserData);

    const getData = async (e) => {

        const res = await fetch('/getData', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            alert('Could not find data');
        }
        else {
            setUserData(data);
            console.log("Get data");
        }
    }
    useEffect(() => {
        getData();
    }, [])

    //delete user

    const deleteUser = async(id)=>{
        const res2 = await fetch(`/deleteUser/${id}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        const deleteUserData = await res2.json();
        console.log(deleteUserData);

        if(deleteUserData === 422 || !deleteUserData)
        {
            alert("Error deleting user")
        }
        else{
            console.log("dleted user")
            getData();
        }
    }
    return (
        <div className='mt-2'>
            <div className="container">
                <h2 className='text-center'>Homepage</h2>
                <hr />
                <div className="add_btn">
                    <Link to='/register' className='mt-2 btn btn-primary'>+ Add data</Link>
                </div>
                <hr />
                <div className="table mt-2">
                    <table class="table">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Age</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Profession</th>
                                <th scope="col">Address</th>
                                <th scope="col">Message</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            getUserData.map((element,id)=>{
                                return (
                                    <>
                                    <tr>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.age}</td>
                                                <td>{element.phone}</td>
                                                <td>{element.profession}</td>
                                                <td>{element.address}</td>
                                                <td>{element.msg}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <Link to={`details/${element._id}`} className='btn btn-success'><RemoveRedEyeIcon /></Link>
                                                    <Link to={`edit/${element._id}`} className='btn btn-primary'><ModeEditIcon /></Link>
                                                    <button onClick={()=>deleteUser(element._id)} className='btn btn-danger'><DeleteIcon /></button>
                                                </td>
                                            </tr>
                                    </>
                                )
                            })
                           }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home
