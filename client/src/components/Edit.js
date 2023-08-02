import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';


const Edit = () => {
    // const [ getUserData, setUserData ] = useState([]);
    // console.log(getUserData);

    const [input, setInput] = useState({
        name: '',
        email: '',
        age: '',
        phone: '',
        profession: '',
        address: '',
        msg: ''
    })

    const setData = (e)=>{
        console.log(e.target.value);
        const {name, value}= e.target;
        setInput((preValue)=>{
            return {
                ...preValue,
                [name]:value
            }
        })
    }

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
            setInput(data);
            console.log("Get data");
        }
    }
    useEffect(()=>{
        getData();
    },[]);

    const updateUser = async(e)=>{
        e.preventDefault();
        const {name, age, email, phone, profession, address, msg} = input;

        const res2 = await fetch(`/updateUser/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name, age, email, phone, profession, address, msg
            })
        })
        const data2 = await res2.json();
        console.log(data2);

        if (res2.status === 422 || !data2) {
            alert('Fill the data');
        }
        else {
            alert('Data added successfully');
            window.location.href = '/';
        }
    }
  return (
    <div className='mt-2'>
      <div className="container">
        <h2 className="text-center">Register</h2>
        <hr />
        <form action="" className='form'>
            <div className="row">
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" name="name" value={input.name} onChange={setData} id="name" required className='form-control'  />
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" name="email" value={input.email} onChange={setData} id="email" required className='form-control'  />
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="age" className='form-label'>Age</label>
                    <input type="number" name="age" value={input.age} onChange={setData} id="age" required className='form-control'  />
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="phone" className='form-label'>Phone</label>
                    <input type="number" name="phone" value={input.phone} onChange={setData} id="phone" required className='form-control'  />
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="Profession" className='form-label'>Profession</label>
                    <input type="text" name="profession" value={input.profession} onChange={setData} id="profession" required className='form-control'  />
                </div>
                <div className='col-lg-6 col-md-6 col-12 mb-3'>
                    <label htmlFor="Address" className='form-label'>Address</label>
                    <input type="text" name="address" value={input.address} onChange={setData} id="address" required className='form-control'  />
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor="msg" className='form-label'>Message</label>
                    <textarea name="msg" value={input.msg} onChange={setData} id="msg" cols="10" rows="5" className='form-control'></textarea>
                </div>
                <button onClick={updateUser} type='submit' className='btn btn-primary mb-5'>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Edit