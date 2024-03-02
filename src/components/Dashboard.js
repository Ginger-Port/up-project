import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { getUsers } from "../utils/getUsers";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [clicks, setClicks] = useState({
    incrementClicks: 0,
    decrementClicks: 0,
    users: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const increment = parseInt(localStorage.getItem("incrementClicks")) || 0;
    const decrement = parseInt(localStorage.getItem("decrementClicks")) || 0;
    const users = getUsers();
    setClicks((prev) => ({
      ...prev,
      incrementClicks: increment,
      decrementClicks: decrement,
      users: users.length,
    }));
  }, []);

  const data = {
    labels: [
      `+ clicks: ${clicks.incrementClicks}`,
      `- clicks: ${clicks.decrementClicks}`,
    ],
    datasets: [
      {
        label: "# of clicks",
        data: [clicks.incrementClicks, clicks.decrementClicks],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  const userDataVisual = {
    labels: [`Total Users: ${clicks.users}`],
    datasets: [
      {
        label: "# No of users",
        data: [clicks.users],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Container className="mt-4">
      <Typography variant="h3">Dashboard</Typography>
      <br></br>
        <Grid container>
          <Grid item xs={12}></Grid>
          <Grid
            item
            xs={6}
            style={{
              width: "21em",
              height: "22em",
              display: "flex",
              justifyContent: "center",
              borderRadius: "2em",
            }}
          >
            <Paper
              elevation={2}
              style={{
                borderRadius: "2em",
              }}
            >
              <Doughnut data={data} />
              <Button
                size="sm"
                variant="outlined"
                onClick={() => navigate("/counter")}
                style={{
                  margin: "0 auto",
                  display: "block",
                }}
              >
                Counter
              </Button>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              width: "21em",
              height: "22em",
              display: "flex",
              justifyContent: "center",
              borderRadius: "2em",
            }}
          >
            <Paper
              elevation={2}
              style={{
                borderRadius: "2em",
              }}
            >
              <Doughnut data={userDataVisual} />
              <Button
                size="sm"
                variant="outlined"
                onClick={() => navigate("/users/add")}
                style={{
                  margin: "0 auto",
                  display: "block",
                }}
              >
                Add User
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
