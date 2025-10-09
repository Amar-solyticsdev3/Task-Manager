import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // ✅ Fetch all users from backend
  const getAllUsers = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user', {
        withCredentials: true,
      });
      if (res.data?.length > 0) {
        setAllUsers(res.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // ✅ Toggle selection of user in modal
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // ✅ Apply selection
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const safeSelectedUsers = Array.isArray(selectedUsers)
    ? selectedUsers
    : [];

  // ✅ Generate avatar initials instead of profile pictures
  const selectedUserAvatar = allUsers
    .filter((user) => safeSelectedUsers.includes(user._id))
    .map((user) => {
      const initial = user.firstName
        ? user.firstName.charAt(0).toUpperCase()
        : '?';
      return { type: 'initial', value: initial, name: user.firstName };
    });

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setTempSelectedUsers(selectedUsers || []);
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2 relative">
      {/* If no one is selected, show Add Members button */}
      {selectedUserAvatar.length === 0 ? (
        <button
          className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm cursor-pointer hover:text-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers /> Add Members
        </button>
      ) : (
        // ✅ Show initials instead of profile pics
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedUserAvatar.map((avatar, index) => (
            <div
              key={index}
              title={avatar.name} // tooltip on hover
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white font-bold -ml-4"
            >
              {avatar.value}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Member Selection Modal */}
      {isModalOpen && (
        <div className="absolute bg-white shadow-lg rounded-lg p-4 z-50 top-12 w-60">
          <h4 className="font-medium mb-2">Select Members</h4>
          <div className="max-h-40 overflow-y-auto">
            {allUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 mb-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={tempSelectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                />
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-400 text-white text-xs font-bold">
                  {user.firstName
                    ? user.firstName.charAt(0).toUpperCase()
                    : '?'}
                </div>
                <span>{user.firstName}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleAssign}
            className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md w-full cursor-pointer hover:bg-blue-600"
          >
            Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectUsers;
