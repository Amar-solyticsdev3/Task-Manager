import React, { useEffect, useState } from 'react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + '/task', { withCredentials: true });
      if (Array.isArray(res.data)) setTasks(res.data);
      else if (Array.isArray(res.data.tasks)) setTasks(res.data.tasks);
      else setTasks([]);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/task/${taskId}`, { withCredentials: true });
      toast.success('Task deleted successfully!');
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete task');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (tasks.length === 0) return <p className="text-center mt-10">No tasks found</p>;

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6 mt-5 text-center text-gray-800">
        Manage Tasks
      </h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => {
          const completedCount = task.todoCheckList?.filter(item => item.completed).length || 0;
          const total = task.todoCheckList?.length || 1;
          const percent = Math.round((completedCount / total) * 100);

          return (
            <div
              key={task._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                  {task.description || 'No description'}
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>{task.status}</span>

                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    {task.priority}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>Start: {task.startDate ? new Date(task.startDate).toLocaleDateString() : '-'}</span>
                  <span>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</span>
                </div>

                {/* Task done progress bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-blue-500 transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{percent}% Done</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => navigate('/admin/create-task', { state: { taskId: task._id } })}
                  className="p-2 rounded-md border border-gray-300 hover:bg-blue-50 transition"
                >
                  <LuPencil className="text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="p-2 rounded-md border border-gray-300 hover:bg-red-50 transition"
                >
                  <LuTrash2 className="text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
