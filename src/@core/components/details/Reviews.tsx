// ** MUI Components import
import { Box, Typography } from "@mui/material";

// ** Hooks import
import {useState, useEffect} from "react"


interface IReview {
  id: number;
  review: string;
  star: number;
  create_at: string;
  coffee_shop_ID: number;
  user_ID: number;
}
interface IProps {
  reviews: IReview[]
}

export default function Reviews(props: IProps) {
  return (
    <Box mt={3}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        レビュー
      </Typography>
      <Box mt={2}>

      </Box>
    </Box>
  );
}
