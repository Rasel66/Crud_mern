const express = require('express');
const router = express.Router();
const users = require("../models/userSchema");

router.post('/register',async(req, res)=>{
    //console.log(req.body);
    const {name, email, age, phone, profession, address, msg} = req.body;
    if(!name|| !email|| !age|| !phone|| !profession|| !address|| !msg){
        res.status(422).json("Please fill the following fields");
    }

    try {
        const preUser = await users.findOne({email: email});
        console.log(preUser);

        if(preUser){
            res.status(422).json("User already exists")
        }
        else{
            const addUser = new users({
                name, email, age, phone, profession, address, msg
            })

            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }
    } catch (error) {
        res.status(422).json(error);
    }
})

//Get user information

router.get('/getData',async(req, res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata);
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

//get individual details

router.get('/getUser/:id',async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userIndividual = await users.findById({_id: id})
        res.status(201).json(userIndividual)
    } catch (error) {
        res.status(422).json(error)
    }
})

//update user
router.patch('/updateUser/:id',async(req, res)=>{
    try {
        const {id} = req.params;

        const updateUser = await users.findByIdAndUpdate(id, req.body,{
            new: true,
        })
        console.log(updateUser);
        res.status(201).json(updateUser);
    } catch (error) {
        res.status(422).json(error);
    }
})

//delete user

router.delete('/deleteUser/:id',async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id})
        console.log(deleteUser);
        res.status(201).json(deleteUser);
    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;