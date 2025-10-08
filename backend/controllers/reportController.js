const Task = require('../models/Task');
const User = require('../models/User');
const excelJs = require('exceljs');

const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'firstName emailId');

    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet('Tasks Report');
    worksheet.columns = [
      { header: 'Task ID', key: '_id', width: 25 },
      { header: 'Title', key: 'title', width: 30 },
      { header: 'Description', key: 'description', width: 50 },
      { header: 'Priority', key: 'priority', width: 15 },
      { header: 'Status', key: 'status', width: 20 },
      { header: 'Due Date', key: 'dueDate', width: 20 },
      { header: 'Assigned To', key: 'assignedTo', width: 30 },
    ];

    tasks.forEach((task) => {
      const assignedTo = task.assignedTo
        .map((user) => `${user.firstName} (${user.emailId})`)
        .join(',');
      worksheet.addRow({
        _id: task._id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.toISOString().split('T')[0],
        assignedTo: assignedTo || 'unassigned',
      });
    });
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="tasks_report.xlsx"'
    );
    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error exporting tasks', error: error.message });
  }
};
const exportUsersReport = async (req, res) => {
  try {
    // 1) load users and tasks
    const users = await User.find()
      .select('firstName lastName emailId _id')
      .lean();

    const userTasks = await Task.find().populate(
      'assignedTo',
      'firstName lastName emailId _id'
    );

    // 2) build map keyed by string user id
    const userTaskMap = {};
    users.forEach((user) => {
      const id = user._id.toString();
      userTaskMap[id] = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        emailId: user.emailId || '',
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        completedTasks: 0,
      };
    });

    // 3) accumulate counts
    userTasks.forEach((task) => {
      if (!Array.isArray(task.assignedTo)) return;

      task.assignedTo.forEach((assignedUser) => {
        const uid = assignedUser._id ? assignedUser._id.toString() : null;
        if (!uid || !userTaskMap[uid]) return;

        userTaskMap[uid].taskCount += 1;

        // use strict comparisons (do NOT assign)
        if (task.status === 'Pending') {
          userTaskMap[uid].pendingTasks += 1;
        } else if (task.status === 'In Progress') {
          userTaskMap[uid].inProgressTasks += 1;
        } else if (task.status === 'Completed') {
          userTaskMap[uid].completedTasks += 1;
        }
      });
    });

    // 4) create excel workbook
    const workbook = new excelJs.Workbook();
    const worksheet = workbook.addWorksheet('User Task Report');

    worksheet.columns = [
      { header: 'User First Name', key: 'firstName', width: 30 },
      { header: 'Email ID', key: 'emailId', width: 40 },
      { header: 'Total Assigned Tasks', key: 'taskCount', width: 20 },
      { header: 'Pending Tasks', key: 'pendingTasks', width: 20 },
      { header: 'In Progress Tasks', key: 'inProgressTasks', width: 20 },
      { header: 'Completed Tasks', key: 'completedTasks', width: 20 },
    ];

    // 5) add rows
    Object.values(userTaskMap).forEach((userRow) => {
      worksheet.addRow(userRow);
    });

    // 6) send workbook
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="users_report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('exportUsersReport error:', error);
    res.status(500).json({ message: 'Error exporting users', error: error.message });
  }
};


module.exports = { exportTasksReport, exportUsersReport };
