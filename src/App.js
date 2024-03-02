import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Counter from "./components/Counter";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import UserDataCollection from "./components/UserDataCollection";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AddIcon from "@mui/icons-material/Add";
import DashboardIcon from "@mui/icons-material/Dashboard";

const actions = [
  { icon: <HourglassEmptyIcon />, name: "Counter", operation: "/counter" },
  { icon: <AddIcon />, name: "Add User", operation: "/users/add" },
  { icon: <DashboardIcon />, name: "Dashboard", operation: "/" },
];

function App() {
  const navigate = useNavigate();

  const handleRoute = (e, operation) => {
    navigate(`${operation}`);
  };

  return (
    <>
      <Routes>
        {/* <Route exact path="/" /> */}
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/counter" element={<Counter />} />
        <Route exact path="/users/add" element={<UserDataCollection />} />
      </Routes>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={(e) => handleRoute(e, action.operation)}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default App;
