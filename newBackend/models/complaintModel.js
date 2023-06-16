const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  ghmc: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  complaint: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  damages: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "Pending"
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);
