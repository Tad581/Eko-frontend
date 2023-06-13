// ** MUI Components import
import { Box, Rating, Typography } from "@mui/material";

// ** Hooks import

// ** MUI Icons import
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

export default function BasicInfo() {
  return (
    <Box>
      <Box>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Ban Công Cafe
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
          2 Đinh Liệt, Hoàn Kiếm
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
          08:00 - 23:00 - オープン中
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
          0123456789
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
        古代フランスのヴィラに位置する Ban Công Cafe
        は、古代の瞑想的な特徴を自然に楽しんでいます。
        黄色い壁、階段、タイル張りの床… 時が経てば忘れ去られてしまいそうです。
        これは通常の補助金付きのスタイルではなく、古い貴族スタイルです。
      </Typography>
    </Box>
  );
}
