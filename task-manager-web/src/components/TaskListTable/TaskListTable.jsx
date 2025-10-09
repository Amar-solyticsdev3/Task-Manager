import moment from 'moment';

const TaskListTable = ({ tableData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-green-100 text-green-600 border border-green-200';
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-600 border border-cyan-200';
      case 'Completed':
        return 'bg-purple-100 text-purple-600 border border-purple-200';
      default:
        return 'bg-gray-100 text-gray-100 border border-gray-200';
    }
  };

  const getpriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-600 border border-blue-200';
      case 'High':
        return 'bg-yellow-300 text-yellow-600 border border-yellow-400';
      default:
        return 'bg-gray-100 text-gray-100 border border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full ">
        <thead>
          <tr className="text-left">
            <th className="px-15 py-3 font-medium text-gray-800 text-[17px] ">
              Name
            </th>
            <th className="px-4 py-3 font-medium text-gray-800 text-[17px] ">
              Status
            </th>
            <th className="px-4 py-3 font-medium text-gray-800 text-[17px] ">
              Priority
            </th>
            <th className="px-4 py-3 font-medium text-gray-800 text-[17px] hidden md:table-cell">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr className="border-t border-gray-200" key={task._id}>
              <td className="my-3 mx-4 text-[15px] text-gray-500 line-clamp-1 overflow-hidden">
                {task.title}
              </td>
              <td>
                <span
                  className={`px-2 py-1 text-sm rounded inline-block ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td>
                <span
                  className={`ml-2 px-4 py-1 rounded inline-block text-sm ${getpriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4">
                {task.createdAt
                  ? moment.utc(task.createdAt).local().format('DD-MM-YYYY')
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
