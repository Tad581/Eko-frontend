// ** MUI Components import
import { Box, Rating, Typography } from "@mui/material";

// ** Hooks import

// ** MUI Icons import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";


interface IProps {
  id: number;
  name: string;
  status: number;
  review: {
    star: number;
    count: number;
  };
  address: string;
  opening_at: string;
  closing_at: string;
  phone_number: string;
  description: string;
}


export default function BasicInfo(props: IProps) {
  return (
    <Box>
      <Box>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          {props.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" my={2}>
        <Rating name="simple-controlled" value={3} precision={0.1} readOnly />
        <Typography component="span" sx={{ marginLeft: 1 }}>
          3.0
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <PlaceOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16 }}
          ml={1}
        >
          {props.address}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <AccessTimeOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16 }}
          ml={1}
        >
          {props.opening_at} - {props.closing_at}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <LocalPhoneOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16 }}
          ml={1}
        >
          {props.phone_number}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <GroupsOutlinedIcon />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontSize: 16, fontWeight: "bold" }}
          ml={1}
        >
          混雑中
        </Typography>
      </Box>
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontSize: 16 }}
        mt={2}
      >
        {props.description}
      </Typography>
    </Box>
  );
}
