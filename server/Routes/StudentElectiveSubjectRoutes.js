const {addElectiveSubjectToStudent,removeElectiveSubjectFromStudent,getElectiveSubjectsForStudent,getStudentsForElectiveSubject,editSubjectOfStudent}=require('../Controllers/StudentElectiveSubjectController');
const router = require('express').Router()
router.post("/addElectiveSubjectToStudent",addElectiveSubjectToStudent);
router.get("/getElectiveSubjectsForStudent/:id",getElectiveSubjectsForStudent);
router.put("/editSubjectOfStudent",editSubjectOfStudent);
module.exports= router;