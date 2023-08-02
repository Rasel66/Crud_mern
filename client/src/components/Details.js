import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Details = () => {
    const [ getUserData, setUserData ] = useState([]);
    console.log(getUserData);
    
    const {id} = useParams("");
    console.log(id)
    const getData = async () => {

        const res = await fetch(`/getUser/${id}`, {
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
    useEffect(()=>{
        getData();
    },[]);

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
            window.location.href = '/';
        }
    }
  return (
    <div className='mt-3'>
      <h4 className='mx-4'>Welcome {getUserData.name}</h4>

        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card p-4">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={{width: 50}} alt="" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <Link to={`/edit/${getUserData._id}`} className='btn btn-primary mx-2 mt-1'><ModeEditIcon/></Link>
                                    <button onClick={()=>deleteUser(getUserData._id)} className='btn btn-danger'><DeleteIcon/></button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="left">
                                        <p><b>Name:</b> {getUserData.name}</p>
                                        <p><b>Age:</b> {getUserData.age}</p>
                                        <p><b>Email:</b> {getUserData.email}</p>
                                        <p><b>Occupassion:</b> {getUserData.profession}</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12">
                                    <div className="right">
                                        <p><b>Mobile:</b> {getUserData.phone}</p>
                                        <p><b>Address:</b> {getUserData.address}</p>
                                        <p><b>Description:</b> {getUserData.msg}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    </div>
  )
}

export default Details
