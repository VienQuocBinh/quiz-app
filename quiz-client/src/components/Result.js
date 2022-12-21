import {
  Alert,
  Button,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAPIEndPoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import { getFormattedTime } from "../utils/TimeUtil";
import Answer from "./Answer";
export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [quesAnswers, setQuesAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const quesIds = context.selectedOptions.map((opt) => opt.quesId);
    createAPIEndPoint(ENDPOINTS.getAnswers)
      .post(quesIds)
      .then((res) => {
        const quesAnswer = context.selectedOptions.map((option) => ({
          ...option,
          ...res.data.find((ans) => ans.qId === option.quesId),
        }));
        setQuesAnswers(quesAnswer);
        calcScore(quesAnswer);
      })
      .catch((err) => console.log(err));
  }, []);

  const calcScore = (qAns) => {
    let tempScore = qAns.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    navigate("/quiz");
  };

  const submitScore = () => {
    createAPIEndPoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken,
      })
      .then((res) => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Card
        sx={{
          mt: 5,
          display: "flex",
          width: "100%",
          maxWidth: 640,
          mx: "auto",
          boxShadow: 5,
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span">{score}</Typography>
            </Typography>
            <Typography variant="h6">
              Time taken: {getFormattedTime(context.timeTaken) + " mins"}
            </Typography>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button>
            {/* {showAlert ? (
              <Alert
                severity="success"
                variant="standard"
                sx={{
                  mt: 2,
                }}
              >
                Score updated
              </Alert>
            ) : null} */}
          </CardContent>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 220, m: 2 }}
          image="./result.png"
        ></CardMedia>
      </Card>
      <Answer quesAnswers={quesAnswers}></Answer>
      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Score updated
        </Alert>
      </Snackbar>
    </>
  );
}
