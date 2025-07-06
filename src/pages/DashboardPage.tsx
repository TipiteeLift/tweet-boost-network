import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";

const DashboardPage = () => {
  const [user] = useState({
    name: "John Doe",
    points: 7,
    level: "Growth Starter"
  });

  return <Dashboard user={user} />;
};

export default DashboardPage;