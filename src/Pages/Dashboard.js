import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import UserMap from "../components/UserMap";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [taskData, setTaskData] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [userLocations, setUserLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const users = response.data;

        const onlineUsers = users.filter((user) =>
          user.activityHistory.some((activity) => activity.status === "online")
        );

        const activityDates = [];

        onlineUsers.forEach((user) => {
          user.activityHistory.forEach((activity) => {
            if (activity.status === "online") {
              const startTime = new Date(activity.startTime);
              const endTime = new Date(activity.endTime);

              let currentDate = new Date(startTime);
              while (currentDate <= endTime) {
                activityDates.push(currentDate.toLocaleDateString());
                currentDate.setDate(currentDate.getDate() + 1); 
              }
            }
          });
        });

        const dailyOnlineCounts = [];
        const uniqueDates = [...new Set(activityDates)]; 

        uniqueDates.forEach((day) => {
          const count = activityDates.filter((date) => date === day).length;
          dailyOnlineCounts.push(count);
        });

        setUserData({
          timestamps: uniqueDates,
          count: dailyOnlineCounts,
        });

        const taskStatusCounts = {
          completed: users.filter((user) => user.status === "Completed").length,
          inProgress: users.filter((user) => user.status === "In Progress")
            .length,
          delayed: users.filter((user) => user.status === "Delayed").length,
        };

        setTaskData(taskStatusCounts);

        const registrations = users.map((user) =>
          new Date(user.registrationDate).toLocaleDateString()
        ); 

        const registrationCount = registrations.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});
        
        const registrationDates = Object.keys(registrationCount);
        const registrationCounts = Object.values(registrationCount);
        
        setRegistrationData({
          dates: registrationDates,
          registrations: registrationCounts,
        });

        const locations = users.map((user) => ({
          lat: user.location[0],
          lng: user.location[1],
          username: user.name,
          status: user.status,
          city: user.address.city,
        }));
        setUserLocations(locations);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="chart-container">
        <div className="chart">
          <h3>Số lượng người dùng online theo thời gian</h3>
          <LineChart data={userData} />
        </div>

        <div className="chart">
          <h3>Phân tích trạng thái nhiệm vụ</h3>
          <PieChart data={taskData} />
        </div>

        <div className="chart">
          <h3>Số lượng người dùng mới đăng ký theo từng ngày</h3>
          <BarChart data={registrationData} />
        </div>
      </div>

      <div className="map-container">
        <h3>Vị trí người dùng trên bản đồ</h3>
        <UserMap locations={userLocations} />
      </div>
    </div>
  );
};

export default Dashboard;
