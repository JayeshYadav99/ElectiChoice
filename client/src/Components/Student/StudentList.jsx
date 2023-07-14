import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ElectiveSubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:4000/subject/allsubjects');
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/subject/deletesubject/${selectedSubject.subjectCode}`);
      // Display a success message or update the subject list
      fetchSubjects();
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Elective Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => (
          <div key={subject.subjectCode} className="border border-gray-300 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">{subject.subjectName}</h2>
            <p className="text-gray-500 mb-4">{subject.subjectCode}</p>
            <p>{subject.subjectDescription}</p>
            <div className="mt-4">
              <Link
                to={`/editsubject/${subject.subjectCode}`}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(subject)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-md p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete the subject <strong>{selectedSubject.subjectName}</strong>?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectiveSubjectPage;
