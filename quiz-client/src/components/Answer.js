import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BASE_URL } from "../api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { green, red } from "@mui/material/colors";

export default function Answer({ quesAnswers }) {
  const [expanded, setExpanded] = useState(false);

  // Allow only one answer open at a time
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Show the correct answer and selected answer of each question
  const markCorrectOrNot = (quesAns, idx) => {
    // if index of answer is equal to 'answer' or 'selected' then paint green or red
    // similar to: if (quesAns.answer === idx || quesAns.selected === idx)
    if ([quesAns.answer, quesAns.selected].includes(idx)) {
      return {
        sx: {
          color: quesAns.answer === idx ? green[500] : red[500],
        },
      };
    }
  };

  return (
    <Box
      sx={{
        mt: 5,
        width: "100%",
        maxWidth: 640,
        mx: "auto",
        boxShadow: 5,
      }}
    >
      {quesAnswers.map((item, idx) => (
        <Accordion
          key={idx}
          disableGutters
          expanded={expanded === idx}
          onChange={handleChange(idx)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
            sx={{
              color: item.answer === item.selected ? green[500] : red[500],
            }}
          >
            <Typography sx={{ width: "90%", flexShrink: 0 }}>
              <strong> {item.qInWords}</strong>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.imageName ? (
              <CardMedia
                component="img"
                image={BASE_URL + "images/" + item.imageName}
                sx={{ m: "10px auto", width: "35%" }}
              ></CardMedia>
            ) : null}
            <List>
              {item.options.map((option, idx) => (
                <ListItem key={idx}>
                  <Typography {...markCorrectOrNot(item, idx)}>
                    <strong>{String.fromCharCode(65 + idx) + ". "}</strong>
                    {option}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
