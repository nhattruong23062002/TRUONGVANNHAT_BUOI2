import * as XLSX from "xlsx";

export const exportToCSV = (filteredUsers) => {
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

export const exportToExcel = (filteredUsers) => {
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

export const getActivityStatus = (activityHistory) => {
  if (!activityHistory || activityHistory.length === 0) return "Offline";
  const latestActivity = activityHistory[activityHistory.length - 1];
  if (latestActivity.endTime) {
    return "Offline";
  }
  return "Online";
};
