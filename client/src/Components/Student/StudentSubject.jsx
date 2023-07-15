import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const StudentSubject = () => {
  const { id } = useParams();
  const [student, setStudent] = useState();
  const [showModal, setShowModal] = useState(false);
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

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/main/removeElectiveSubjectFromStudent`, {
        data: {
          studentId: student._id,
          electiveSubjectId: selectedSubject._id,
        },
      });
      // Display a success message or update the subject list
      fetchAssignedSubjects(student._id);
    } catch (error) {
      console.error(error);
      // Display an error message
    }
    setShowModal(false);
  };
  
  const cancelDelete = () => {
    setSelectedSubject(null);
    setShowModal(false);
  };


  return (
    <div className="mb-8">
      {student && (
        <div className="bg-white shadow rounded p-4 mb-4 mt-4  mx-auto max-w-sm border border-blue-500">
          <h3 className="text-lg font-medium">{student.name}</h3>
          <p className="text-gray-500">ID: {student.idNumber}</p>
          <p className="text-gray-500">iD: {student._id}</p>
          <p className="text-gray-500">Email: {student.email}</p>
          <p className="text-gray-500">Phone: {student.phoneNumber}</p>
        </div>
      )}

      <div className="  mb-8">
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

      <h3 className=" mb-4">Assign Elective Subject</h3>
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
      {showModal && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative bg-white rounded-lg shadow max-w-md">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              onClick={cancelDelete}
              data-modal-toggle="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this subject?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={confirmDelete}
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={cancelDelete}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSubject;
