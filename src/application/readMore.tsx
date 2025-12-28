"use client";
import { useState } from "react";
import { Typography, Button } from "@mui/material";

type ReadMorePropType = {
  text: string;
  maxLength?: number;
  className?: string;
  fontFamily?: string;
  textVariant?:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
};

export default function ReadMore(props: Readonly<ReadMorePropType>) {
  const { text, maxLength = 120, textVariant = "body1", className, fontFamily } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <Typography variant={textVariant} sx={{fontFamily: `${fontFamily}` || 'inherit'}} className={className}>
        {isExpanded
          ? text
          : text.slice(0, maxLength) + (text.length > maxLength ? "..." : "")}
      </Typography>
      {text.length > maxLength && (
        <Button
        className="!font-bold"
          variant="text"
          // color="info"
          // size="small"
          onClick={toggleReadMore}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </div>
  );
}
