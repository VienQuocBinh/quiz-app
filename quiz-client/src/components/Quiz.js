import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, createAPIEndPoint, ENDPOINTS } from "../api";
import useStateContext from "../hooks/useStateContext";
import { getFormattedTime } from "../utils/TimeUtil";

export default function Quiz() {
  const [question, setQuestion] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const r = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(r);
    };
  }, []);

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    });
    createAPIEndPoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateAnswer = (quesId, optionIdx) => {
    const temp = [...context.selectedOptions];
    temp.push({
      quesId,
      selected: optionIdx,
    });

    if (questionIndex < 4) {
      setContext({ selectedOptions: [...temp] });
      setQuestionIndex((prevIndx) => prevIndx + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken: timeTaken });
      //navigate result component
      navigate("/result");
    }
  };

  return question.length !== 0 ? (
    <Card
      sx={{
        maxWidth: 640,
        mx: "auto",
        mt: 5,
        boxShadow: 5,
        borderRadius: 5,
        "& .MuiCardHeader-action": {
          m: 0,
          alignSelf: "center",
        },
      }}
    >
      {/* Card Header  */}
      <CardHeader
        title={"Question " + (questionIndex + 1) + " of 5"}
        action={<Typography>{getFormattedTime(timeTaken)}</Typography>}
      ></CardHeader>

      {/* Current Progress*/}
      <Box>
        <LinearProgress
          variant="determinate"
          value={((questionIndex + 1) * 100) / 5}
        />
      </Box>

      {/* Image if has */}
      {question[questionIndex].imageName != null ? (
        <CardMedia
          component="img"
          image={BASE_URL + "images/" + question[questionIndex].imageName}
          sx={{ width: "35%", m: "10px auto" }}
        ></CardMedia>
      ) : null}

      <CardContent>
        {/* Question content In words */}
        <Typography variant="h6">
          <strong>{question[questionIndex].qInWords}</strong>
        </Typography>

        {/* List of 4 answers */}
        <List>
          {question[questionIndex].options.map((item, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => updateAnswer(question[questionIndex].qId, idx)}
            >
              <div>
                <strong>{String.fromCharCode(65 + idx) + "."}</strong> {item}
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null;
}
