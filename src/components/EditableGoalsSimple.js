import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ControlledCheckbox from "./ControlledCheckbox";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

const goalTheme = createTheme({
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "10px",
  paddingBottom: "10px",
  fontSize: "1.25em",
  fontWeight: "normal",
  lineHeight: "1.25em",
});
const taskTheme = createTheme({
  paddingLeft: "0px",
  paddingRight: "5px",
  paddingTop: "9px",
  paddingBottom: "9px",
  fontSize: "1em",
  fontWeight: "normal",
  lineHeight: "normal",
});
const ThemedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    padding: "0px",
  },
  "& .MuiOutlinedInput-input": {
    paddingLeft: theme.paddingLeft,
    paddingRight: theme.paddingRight,
    paddingTop: theme.paddingTop,
    paddingBottom: theme.paddingBottom,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: theme.lineHeight,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "0px",
  },
}));

const EditableGoal = ({
  goal,
  index,
  // Goal functions
  setCategory,
  markGoal,
  removeGoal,
  handleGoalChange,
  // Task functions
  addTask,
}) => {
  return (
    <div className={"flex flex-col ml-6 py-2"}>
      <div className="text-sm uppercase font-bold flex flex-row items-center">
        <div className="grow text-sm">
          <ThemeProvider theme={goalTheme}>
            <ThemedTextField
              key={index}
              defaultValue={goal.text}
              sx={{ width: "100%" }}
              onChange={(event) => handleGoalChange(event, index)}
              multiline
            />
          </ThemeProvider>
        </div>
        <div className="text-gray-300">
          <DeleteOutlineIcon onClick={() => removeGoal(index)} />
        </div>
      </div>
    </div>
  );
};

export default function EditableGoalsSimple(props) {
  const [goals, setGoals] = React.useState(
    JSON.parse(localStorage.getItem("goals")) ?? []
  );

  // These all need access to the state, so defining the functions here, and passing them down to children

  const setCategory = (event, index) => {
    const newGoals = [...goals];
    newGoals[index].category = event.target.value;
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const addGoal = () => {
    const newGoals = [
      ...goals,
      {
        key: Date.now(),
        text: "Give your goal a title...",
        isDone: false,
        category: "Uncategorised",
        tasks: [],
      },
    ];
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
    // console.log(newGoals);
  };

  const markGoal = (index) => {
    const newGoals = [...goals];
    newGoals[index].isDone = newGoals[index].isDone ? false : true;
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
  };

  const removeGoal = (index) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
    localStorage.setItem("goals", JSON.stringify(newGoals));
    localStorage.removeItem("goals_" + index);
  };

  const handleGoalChange = (event, index) => {
    goals[index].text = event.target.value;
    localStorage.setItem("goals", JSON.stringify(goals));
  };

  return (
    <div>
      <TransitionGroup>
        {goals.map((goal, index) => {
          return (
            <Collapse key={index}>
              <EditableGoal
                key={index}
                index={index}
                goal={goal}
                // Goal functions
                setCategory={setCategory}
                markGoal={markGoal}
                removeGoal={removeGoal}
                handleGoalChange={handleGoalChange}
              />
            </Collapse>
          );
        })}
      </TransitionGroup>
      <Button
        sx={{ color: "#BBB", justifyContent: "left" }}
        onClick={() => addGoal()}
      >
        Add Goal +
      </Button>
    </div>
  );
}
