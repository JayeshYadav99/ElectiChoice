
const mongoose = require('mongoose');
// const StudentModel =require('./StudentModel')
// const ElectiveSubjectModel=require('./ELectiveSubjectModel')
const studentElectiveSubjectSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    electiveSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ElectiveSubject',
      required: true
    }
  });
  
  const StudentElectiveSubject = mongoose.model('StudentElectiveSubject', studentElectiveSubjectSchema);
  module.exports = StudentElectiveSubject;