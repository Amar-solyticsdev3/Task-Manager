import React, { useEffect } from 'react';
import { useUserAuth } from '../../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiPaths';
import moment from 'moment';
import { addThousandSeparator } from '../../utils/helper';
import InfoCard from '../../components/cards/InfoCard';
import { LuArrowRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import TaskListTable from '../../components/TaskListTable/TaskListTable';
import TaskPieChart from '../../components/charts/TaskPieChart';
import TaskBarChart from '../../components/charts/TaskBarChart';
const Dashboards = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [barGraphData, setBarGraphData] = useState(null);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const seeMore = () => {
    navigate('/admin/tasks');
  };


  const prepareChartData = (data) => {

    const taskDistribution = data?.taskDistribution || null;
    const taskPriority = data?.totalPriority || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ]
    setPieChartData(taskDistributionData);

    const taskPriorityData = [
      { priority: "Low", count: taskPriority?.Low || 0 },
      { priority: "Medium", count: taskPriority?.Medium || 0 },
      { priority: "High", count: taskPriority?.High || 0 },
    ]
    setBarGraphData(taskPriorityData);
  }

  const getDashboardData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/task/dashboard-data', {
        withCredentials: true,
      });
      if (res.data) {
        setDashboardData(res.data);
        prepareChartData(res.data.charts);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };
  useEffect(() => {
    getDashboardData();
    return () => { };
  }, []);

  //  console.log("Bar Graph Data:", barGraphData);
  // console.log("Pie Chart Data:", pieChartData);


  return (
    <DashboardLayout>
      {/* Creating Summary Section */}
      <div className="   bg-white p-6 rounded-3xl border border-[rgba(229,231,235,0.5)] shadow-md shadow-gray-100 my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">
              Good Morning! {user.firstName}
            </h2>
            <p className="text-sm md:text-[13px] text-gray-500 mt-1.5">
              {moment().format('dddd Do MMMM YYYY')}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-6">
          <InfoCard
            label="Total Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />
          <InfoCard
            label="Pending Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-green-500"
          />
          <InfoCard
            label="In Progress Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-300"
          />
          <InfoCard
            label="Completed Tasks"
            value={addThousandSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color="bg-red-300"
          />
        </div>
      </div>

            {/* Charts Section(PieChart & BarChart) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <TaskPieChart data={pieChartData} />
        <TaskBarChart data={barGraphData} />
      </div>

      {/* Recent Tasks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-3xl border border-[rgba(229,231,235,0.5)] shadow-md shadow-gray-100">
            <div className="flex  items-center justify-between mb-4">
              <h5 className="text-xl font-medium">Recent Tasks</h5>
              <button
                className="flex items-center justify-center  gap-2 text-sm  hover:text-blue-600 cursor-pointer  "
                onClick={seeMore}
              >
                see All
                <LuArrowRight />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboards;
