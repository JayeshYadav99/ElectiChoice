import React from 'react'

export default function SubjectNavbar() {
  return (
    <div><nav class="bg-blue-500">
    <div class="container mx-auto px-4 py-2 flex items-center justify-between">
      <div class="text-white font-bold text-lg">Elective Subject App</div>
      <div class="flex space-x-4">
        <a href="#" class="text-white hover:text-gray-200">Home</a>
        <a href="/add-subject" class="text-white hover:text-gray-200">Add Subject</a>
        <a href="#" class="text-white hover:text-gray-200">Subject Info</a>
        <a href="#" class="text-white hover:text-gray-200">Updation History</a>
      </div>
    </div>
  </nav>
  </div>
  )
}
