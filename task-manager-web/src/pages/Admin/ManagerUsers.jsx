import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";

const ManagerUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user", { withCredentials: true });
      if (Array.isArray(res.data)) setAllUsers(res.data);
      else setAllUsers([]);
    } catch (error) {
      console.log("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
    // Optional: refresh every 10s to reflect changes made by users
    const interval = setInterval(getAllUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  // Determine overall task status for a user
  const getTaskStatus = (tasks = []) => {
    if (!tasks || tasks.length === 0) return "No Tasks";

    const completedCount = tasks.filter((t) => t.status === "Completed").length;
    if (completedCount === tasks.length) return "Completed";

    const inProgress = tasks.some((t) => t.status === "In Progress");
    if (inProgress) return "In Progress";

    return "Pending";
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Manage Users
        </h2>

        {loading ? (
          <p className="text-center mt-10">Loading users...</p>
        ) : allUsers.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No users found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-3xl shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* User Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Email:</span> {user.emailId || "N/A"}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Role:</span> {user.role || "Member"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Joined:</span>{" "}
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>

                {/* Task Status */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">Task Status</p>
                  <span
                    className={`inline-block px-4 py-1 rounded-full font-medium text-sm transition-colors duration-300 ${
                      getTaskStatus(user.tasks) === "Completed"
                        ? "bg-gradient-to-r from-green-200 to-green-400 text-green-900"
                        : getTaskStatus(user.tasks) === "In Progress"
                        ? "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-900"
                        : getTaskStatus(user.tasks) === "Pending"
                        ? "bg-gradient-to-r from-red-200 to-red-400 text-red-900"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {getTaskStatus(user.tasks)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagerUsers;
