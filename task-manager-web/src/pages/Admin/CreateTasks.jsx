import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { PRIORITY_DATA } from '../../utils/data';
import SelectUsers from '../../components/Inputs/SelectUsers';
import { LuTrash } from 'react-icons/lu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

const CreateTasks = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Low',
    dueDate: '',
    assignedTo: [],
    todoCheckList: [''],
  });

  const [error, setError] = useState('');
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };
  const handleUsersChange = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      [field]: value, // assign array of selected user IDs
    }));
  };

  const clearData = () => {
    setTaskData({
      title: '',
      description: '',
      priority: 'Low',
      dueDate: '',
      assignedTo: [],
      todoCheckList: [],
    });
  };

  const handleChecklistChange = (index, value) => {
    const newCheckList = [...taskData.todoCheckList];
    newCheckList[index] = value;
    setTaskData({ ...taskData, todoCheckList: newCheckList });
  };
  const addChecklistItem = () => {
    setTaskData({
      ...taskData,
      todoCheckList: [...taskData.todoCheckList, ''],
    });
  };
  const removeChecklistItem = (index) => {
    const newCheckList = [...taskData.todoCheckList];
    newCheckList.splice(index, 1);
    setTaskData({ ...taskData, todoCheckList: newCheckList });
  };
  const createTask = async () => {
    try {
      const todoList = taskData.todoCheckList.map((item) => ({
        text: item,
        completed: false,
      }));
      await axios.post(
        BASE_URL + '/task',
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todoList,
        },
        { withCredentials: true }
      );
      toast.success('Task created successfully!');
      clearData();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };
  const updateTask = async () => {
    try {
      const todoList = taskData.todoCheckList.map((item) => ({
        text: item,
        completed: false,
      }));

      await axios.put(
        `${BASE_URL}/task/${taskId}`,
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoCheckList: todoList,
        },
        { withCredentials: true }
      );

      toast.success('Task updated successfully!');
      navigate('/admin/tasks'); // redirect to manage tasks page
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };
  const getTaskDetailsByID = async () => {
    if (!taskId) return; // no task to fetch

    try {
      const res = await axios.get(`${BASE_URL}/task/${taskId}`, {
        withCredentials: true,
      });
      const task = res.data;

      // Pre-fill form
      setTaskData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate.slice(0, 10), // for date input
        assignedTo: task.assignedTo.map((user) => user._id), // assuming backend returns users
        todoCheckList: task.todoCheckList.map((item) => item.text),
      });
    } catch (error) {
      console.error('Error fetching task:', error);
      toast.error('Failed to load task details');
    }
  };
  const deleteTask = async () => {
    if (!taskId) return;
    try {
      await axios.delete(`${BASE_URL}/task/${taskId}`, {
        withCredentials: true,
      });
      toast.success('Task deleted successfully!');
      navigate('/admin/manage-tasks'); // redirect after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };
  const handleSubmit = async () => {
    setError(null);

    if (!taskData.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!taskData.description.trim()) {
      setError('Description is required.');
      return;
    }
    if (!taskData.dueDate.trim()) {
      setError('Due Date is required.');
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError('Task not assigned to any member.');
      return;
    }
    if (taskData.todoCheckList?.length === 0) {
      setError('Add atleast one todo task.');
      return;
    }
    if (taskId) {
      updateTask();
      return;
    }

    createTask();
  };

  useEffect(() => {
    getTaskDetailsByID();

    return () => {};
  }, [taskId]);
  return (
    <DashboardLayout>
      <div className="  w-3/4 p-8  border border-[rgba(229,231,235,0.5)] mt-5 pb-12 rounded-3xl shadow-md shadow-gray-100 bg-white ">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {taskId ? 'Update Task' : 'Create Task'}
        </h2>
        {taskId && (
          <div className="flex justify-end -mt-12">
            <button
              className="flex items-center  gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1  border border-rose-100 cursor-pointer"
              onClick={() => setOpenDeleteAlert(true)}
            >
              <LuTrash className="text-red-500 text-xl" />
              Delete
            </button>
          </div>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mt-4">
            <label className="text-md font-medium text-slate-600">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={taskData.title}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="mt-3">
            <label className="text-md font-medium text-slate-600">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              placeholder=" Description task"
              value={taskData.description}
              rows={4}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-12   gap-4 mt-2">
            <div className="col-span-6 md:col-span-4">
              <label className="text-md font-medium text-slate-600">
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none px-2.5 py-3 mt-2"
              >
                {PRIORITY_DATA.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-6 md:col-span-4">
              <label className="text-md font-medium text-slate-600">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none px-2.5 py-3 mt-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-2">
            <div className="col-span-6 md:col-span-4">
              <label className=" text-md font-medium text-slate-600">
                Assigned To
              </label>
              <SelectUsers
                selectedUsers={taskData.assignedTo || []}
                setSelectedUsers={(value) =>
                  handleUsersChange('assignedTo', value)
                }
              />
            </div>
          </div>
          <div className="mt-3">
            <label className=" text-md font-medium text-slate-600">
              TODO Checklist
            </label>
            <div>
              {taskData.todoCheckList.map((item, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleChecklistChange(index, e.target.value)
                    }
                    className="w-full border p-2 rounded"
                    placeholder={`Checklist item ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(index)}
                    className="text-red-500"
                  >
                    <LuTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addChecklistItem}
                className="mt-2 px-3 py-1 bg-gray-200 rounded"
              >
                + Add Item
              </button>
            </div>

            {error && <p className="text-rose-500 text-sm mt-1">{error}</p>}
            <div>
              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mt-3"
              >
                {taskId ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
        {openDeleteAlert && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800">
                Are you sure you want to delete this task?
              </h3>
              <div className="flex justify-end mt-4 gap-3">
                <button
                  onClick={() => setOpenDeleteAlert(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    await deleteTask();
                    setOpenDeleteAlert(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CreateTasks;
