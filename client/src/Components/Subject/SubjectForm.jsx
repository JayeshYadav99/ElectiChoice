import React, { useState } from 'react';
import axios from 'axios';

const SubjectForm = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    subjectDescription: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.subjectName.trim()) {
      newErrors.subjectName = 'Subject Name is required';
    }
    if (!formData.subjectCode.trim()) {
      newErrors.subjectCode = 'Subject Code is required';
    }
    if (!formData.subjectDescription.trim()) {
      newErrors.subjectDescription = 'Subject Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post('http://localhost:4000/subject/addsubject', formData)
        .then((response) => {
          console.log(response.data);
          setFormData({
            subjectName: '',
            subjectCode: '',
            subjectDescription: '',
          });
          setErrors({});
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 w-96">Subject Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="subjectName" className="block mb-1 font-medium">
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleInputChange}
              className={`w-full border ${
                errors.subjectName ? 'border-red-500' : 'border-gray-300'
              } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.subjectName && (
              <p className="text-red-500 text-sm mt-1">{errors.subjectName}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="subjectCode" className="block mb-1 font-medium">
              Subject Code
            </label>
            <input
              type="text"
              id="subjectCode"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleInputChange}
              className={`w-full border ${
                errors.subjectCode ? 'border-red-500' : 'border-gray-300'
              } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.subjectCode && (
              <p className="text-red-500 text-sm mt-1">{errors.subjectCode}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="subjectDescription" className="block mb-1 font-medium">
              Subject Description
            </label>
            <textarea
              id="subjectDescription"
              name="subjectDescription"
              value={formData.subjectDescription}
              onChange={handleInputChange}
              className={`w-full border ${
                errors.subjectDescription ? 'border-red-500' : 'border-gray-300'
              } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.subjectDescription && (
              <p className="text-red-500 text-sm mt-1">{errors.subjectDescription}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
