import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const UserActivityChart = () => {
  const [userData, setUserData] = useState({ timestamps: [], count: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        const processedData = processDataFromAPI(response.data);
        setUserData(processedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const processDataFromAPI = (users) => {
    const activityTimes = [];
  
    users.forEach(user => {
      user.activityHistory.forEach(activity => {
        if (activity.status === 'online') {
          const startTime = new Date(activity.startTime);
          const endTime = new Date(activity.endTime);
  
          let currentTime = new Date(startTime);
          while (currentTime <= endTime) {
            const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.getHours()}:00`;
            activityTimes.push(formattedTime);
            currentTime.setHours(currentTime.getHours() + 1);
          }
        }
      });
    });

    const sortedActivityTimes = activityTimes.sort((a, b) => {
      const dateA = new Date(a.split(' ')[0]);
      const dateB = new Date(b.split(' ')[0]);
      return dateB - dateA; 
    });
  
    const hourlyOnlineCounts = [];
    const uniqueTimes = [...new Set(sortedActivityTimes)]; 
  
    uniqueTimes.forEach(time => {
      const count = sortedActivityTimes.filter(timeSlot => timeSlot === time).length;
      hourlyOnlineCounts.push(count);
    });
  
    return { timestamps: uniqueTimes, count: hourlyOnlineCounts };
  };
  
  return (
    <div>
      <Line
        data={{
          labels: userData.timestamps,
          datasets: [
            {
              label: 'Online Users',
              data: userData.count,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw} users online`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date and Hour'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Number of Users'
              }
            }
          }
        }}
      />
    </div>
  );
};

export default UserActivityChart;
