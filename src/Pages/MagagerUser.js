import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Input, Select, Button } from "antd";
import * as XLSX from "xlsx"; 
const { Option } = Select;

const ManagerUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [activityStatus, setActivityStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getActivityStatus = (activityHistory) => {
    if (!activityHistory || activityHistory.length === 0) return "Offline";
    const latestActivity = activityHistory[activityHistory.length - 1];
    if (latestActivity.endTime) {
      return "Offline";
    }
    return "Online";
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.country.toLowerCase().includes(searchTerm.toLowerCase());

    const userRegistrationDate = new Date(user.registrationDate);
    const matchesDate = selectedDate
      ? isSameDay(userRegistrationDate, selectedDate)
      : true;

    const matchesRole = selectedRole ? user.role === selectedRole : true;

    const userActivityStatus = getActivityStatus(user.activityHistory);
    const matchesActivityStatus = activityStatus
      ? userActivityStatus === activityStatus
      : true;

    return (
      matchesSearchTerm && matchesDate && matchesRole && matchesActivityStatus
    );
  });

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date ? date.toDate() : null);
  };

  const exportToCSV = () => {
    const csvData = filteredUsers.map((user, index) => ({
      STT: index + 1,
      Name: user.name,
      Age: user.age,
      Email: user.email,
      Status: user.status,
      Location: `${user.address.city}, ${user.address.country}`,
      Role: user.role,
      "Registration Date": new Date(user.registrationDate).toLocaleDateString(),
      "Activity Status": getActivityStatus(user.activityHistory),
    }));

    const csvHeaders = [
      "STT",
      "Name",
      "Age",
      "Email",
      "Status",
      "Location",
      "Role",
      "Registration Date",
      "Activity Status",
    ];

    const csvRows = [
      csvHeaders.join(","), 
      ...csvData.map((row) =>
        csvHeaders.map((header) => row[header]).join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredUsers.map((user, index) => ({
      STT: index + 1,
      Name: user.name,
      Age: user.age,
      Email: user.email,
      Status: user.status,
      Location: `${user.address.city}, ${user.address.country}`,
      Role: user.role,
      "Registration Date": new Date(user.registrationDate).toLocaleDateString(),
      "Activity Status": getActivityStatus(user.activityHistory),
    })));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  return (
    <div>
      <h1>Manager User</h1>

      <div className="filter-container" style={{ marginBottom: "20px" }}>
        <div>
          <DatePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            className="date-picker"
            placeholder="Select a Registration Date"
          />

          <Select
            value={selectedRole}
            onChange={(value) => setSelectedRole(value)}
            style={{ width: 200, marginLeft: "16px" }}
            placeholder="Select Role"
          >
            <Option value="">All Roles</Option>
            <Option value="Admin">Admin</Option>
            <Option value="Guest">Guest</Option>
            <Option value="User">User</Option>
          </Select>

          <Select
            value={activityStatus}
            onChange={(value) => setActivityStatus(value)}
            style={{ width: 200, marginLeft: "16px" }}
            placeholder="Select Activity Status"
          >
            <Option value="">All Activity Status</Option>
            <Option value="Online">Online</Option>
            <Option value="Offline">Offline</Option>
          </Select>
        </div>

        <Input
          type="text"
          placeholder="Search by name, email, city, or country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ marginLeft: "16px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Button onClick={exportToCSV} style={{ marginRight: "16px" }}>
          Export to CSV
        </Button>
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>

      <table
        className="user-table"
        style={{ width: "100%", marginTop: "16px" }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Status</th>
            <th>Location</th>
            <th>Role</th>
            <th>Registration Date</th>
            <th>Activity Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {user.address.city}, {user.address.country}
              </td>
              <td>{user.role}</td>
              <td>
                {new Date(user.registrationDate).toLocaleDateString()}
              </td>
              <td>{getActivityStatus(user.activityHistory)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerUser;
