import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [incrementalClicks, setIncrementalClicks] = useState(0);
  const [decrementalClicks, setDecrementalClicks] = useState(0);
  const [timeInput, setTimeInput] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const incrementClicksFromStorage = localStorage.getItem("incrementClicks");
    const decrementClicksFromStorage = localStorage.getItem("decrementClicks");

    if (incrementClicksFromStorage) {
      setIncrementalClicks(parseInt(incrementClicksFromStorage));
    }

    if (decrementClicksFromStorage) {
      setDecrementalClicks(parseInt(decrementClicksFromStorage));
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [count]);

  const color =
    count === 0 ? "hsl(0, 0%, 100%)" : `hsl(${(count * 10) % 360}, 70%, 80%)`;

  const increment = () => {
    const newIncrementClicks = incrementalClicks + 1;
    setCount((count) => count + 1);
    setIncrementalClicks(newIncrementClicks);
    localStorage.setItem("incrementClicks", newIncrementClicks.toString());
  };

  const decrement = () => {
    const newDecrementClicks = decrementalClicks + 1;
    if (count > 0) setCount((count) => count - 1);
    setDecrementalClicks(newDecrementClicks);
    localStorage.setItem("decrementClicks", newDecrementClicks.toString());
  };

  const reset = () => {
    setCount(0);
  };

  const handleTimer = (e) => {
    e.preventDefault();
    const val = parseInt(timeInput);
    if (!isNaN(val) && val > 0) {
      setTimeInput("");
      if (timer === null) {
        setTimeout(() => {
          setCount((prev) => prev + 1);
          setTimer(null);
        }, val * 1000);
      }
    }
  };

  const handleInput = (e) => {
    setTimeInput(e.target.value);
  };

  return (
    <>
      <Container
        className="mt-4"
        style={{
          backgroundColor: color,
        }}
      >
        <Typography variant="h3">Counter</Typography>
        <Paper elevation={2} style={{ padding: "1em", marginTop: "4em" }}>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h4" gutterBottom>
                Counts: {count}
              </Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={2}>
              <IconButton aria-label="increase" onClick={increment}>
                <AddIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="decrease" onClick={decrement}>
                <RemoveIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="reset" onClick={reset}>
                <RestartAltIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
            </Grid>
            <Grid item xs={12}>
              <input type="text" name="timer" value={timeInput} onChange={handleInput} />
              <button onClick={handleTimer}>Add timer</button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Counter;
