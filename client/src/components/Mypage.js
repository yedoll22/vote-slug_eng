import axios from "axios";
import React, { useState } from "react";

export default function Mypage() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          My profile
        </h1>

        <div className="grid grid-cols-5">
          <label
            className="col-span-2 mb-2 font-bold text-lg text-gray-900"
            for="email"
          >
            email
          </label>
          <div className="col-span-2 text-grey-800">email</div>
        </div>
        <div className="grid grid-cols-5">
          <label
            className="col-span-2 mb-2 font-bold text-lg text-gray-900"
            for="nickname"
          >
            Nickname
          </label>
          <div className="col-span-2 text-grey-800">Nickname</div>
          <button
            className="inline bg-teal-400 hover:bg-teal-600 text-white text-lg rounded"
            type="Edit"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-5">
          <label
            className="col-span-2 mb-2 font-bold text-lg text-gray-900"
            for="gender"
          >
            Gender
          </label>
          <div className="col-span-2 text-grey-800">Gender</div>
        </div>
        <div className="grid grid-cols-5">
          <label
            className="col-span-2 mb-2 font-bold text-lg text-gray-900"
            for="dateOfBirth"
          >
            DOB
          </label>
          <div className="col-span-2 text-grey-800">DOB</div>
        </div>
        <button
          className="block bg-teal-400 hover:bg-teal-600 text-white mx-auto rounded"
          type="submit"
        >
          password edit
        </button>
        <div className="grid grid-cols-2">
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white text-lg mx-auto rounded"
            type="submit"
          >
            탈퇴
          </button>
          <button
            className="bg-teal-400 hover:bg-teal-600 text-white text-lg mx-auto rounded"
            type="submit"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
