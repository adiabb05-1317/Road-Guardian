const express=require('express')
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Complaint = require('../models/complaintModel')
const router = express.Router();
const asyncHandler = require("express-async-handler");


router.post(
    '/Postcomplaints',
    asyncHandler(async (req, res) => {
      const {
        image,
        location,
        pinCode,
        ghmc,
        complaint,
        damages,
        date,
        status,
      } = req.body;
  
      const newComplaint = await Complaint.create({
        image,
        location,
        pinCode,
        ghmc,
        complaint,
        damages,
        date,
        status,
      });
  
      const token = jwt.sign({ userId: newComplaint._id }, 'adi123');
      res.status(201).json({
        token
      });
    })
  );
module.exports=router