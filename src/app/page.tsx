"use client";
import { useState } from 'react';
import axios from '@/configs/axios';
import { createContext } from 'vm';
import { User } from '@/types/User';

export default function App() {
  const [text, setText] = useState('');
  const [users, setUsers] = useState(Array<User>);

  const handleClick = () => {
    axios.get('/api/v1/users')
      .then((res) => {
        setUsers(res.data)
        console.log(res.data[0].activated);
      })
  };
  
  const shincodeInfo = {
    name: "shincode",
    age: 24,
  }

  const ShinCodeContext = createContext(shincodeInfo);



  return (
    <div className="bg-blue-50 min-h-screen">
      <div className='flex justify-center mt-10'>
        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleClick()}>Click!</button>
      </div>
      <div className="flex justify-center mt-5">
        <h1 className="text-3xl font-bold underline">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
              <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Activated
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-blue-500 border-b border-blue-400" key={user.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                      { user.id }
                    </th>
                    <td className="px-6 py-4">
                      { user.username }
                    </td>
                    <td className="px-6 py-4">
                      { user.email}
                    </td>
                    <td className="px-6 py-4">
                      { user.password }
                    </td>
                    <td className="px-6 py-4">
                      { user.activated ? '○' : '×'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </h1>
      </div>
    </div>
  )
}