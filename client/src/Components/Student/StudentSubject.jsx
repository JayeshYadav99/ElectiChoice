import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const StudentSubject = () => {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const [electiveSubjects, setElectiveSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [assignedSubjects, setAssignedSubjects] = useState([]);

  useEffect(() => {
    fetchStudent(id);
    fetchElectiveSubjects();
    console.log(id);
   
  }, [id]);

  const fetchStudent = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:4000/student/getstudent/${studentId}`);
      console.log(response.data[0])
      setStudent(response.data[0]);
      fetchAssignedSubjects(response.data[0]._id);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const fetchElectiveSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/subject/allsubjects`);
      setElectiveSubjects(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const fetchAssignedSubjects = async (studentId) => {
    try {
      
      const response = await axios.get(`http://localhost:4000/main/getElectiveSubjectsForStudent/${studentId}`);
      const subjects = response.data.map((item) => item.electiveSubject);
      console.log(subjects);
      setAssignedSubjects(subjects);
    } catch (error) {
      console.error(error);
      // Handle the error
      throw error;
    }
  };

  const assignSubject = async () => {
    try {
        console.log(selectedSubject);
      const response = await axios.post(`http://localhost:4000/main/addElectiveSubjectToStudent`, {
        studentId:student._id,
        electiveSubjectId: selectedSubject,
      });
      console.log(response.data);
      // Update the student data or show a success message
      fetchAssignedSubjects(id);
      fetchStudent(id);
      setSelectedSubject(null);
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className="mb-8">
      {student && (
        <div className="bg-white shadow rounded p-4 mb-4">
          <h3 className="text-lg font-medium">{student.name}</h3>
          <p className="text-gray-500">ID: {student.idNumber}</p>
          <p className="text-gray-500">iD: {student._id}</p>
          <p className="text-gray-500">Email: {student.email}</p>
          <p className="text-gray-500">Phone: {student.phoneNumber}</p>
        </div>
      )}

      <div className="mb-8">
        <h3>Assigned Elective Subjects</h3>
        {assignedSubjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {assignedSubjects.map((subject) => (
              <div key={subject._id} className="border border-gray-300 p-4 rounded">
                <h2 className="text-lg font-bold mb-2">{subject.subjectName}</h2>
                <p className="text-gray-500 mb-4">{subject.subjectCode}</p>
                <p>{subject.subjectDescription}</p>
                <div className="mt-4">
              <Link
to={{
    pathname: `/edit-student-subject/${student._id}/${subject._id}`,
  
  }}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(subject)}
                data-modal-toggle="popup-modal"
              >
                Delete
              </button>
            </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No elective subjects assigned.</p>
        )}
      </div>

      <h3 className="mb-4">Assign Elective Subject</h3>
      <div className="flex">
        <select value={selectedSubject} onChange={handleSubjectChange} className="mr-4">
          <option value="">Select an Elective Subject</option>
          {electiveSubjects.map((subject) => (
            <option key={subject._id} value={subject._id}>
              {subject.subjectName}
            </option>
          ))}
        </select>
        <button onClick={assignSubject} disabled={!selectedSubject} className="bg-blue-500 text-white px-4 py-2 rounded">
          Assign Subject
        </button>
      </div>
    </div>
  );
};

export default StudentSubject;
