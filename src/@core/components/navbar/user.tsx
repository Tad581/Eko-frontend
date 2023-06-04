// ** MUI Component import
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";

// ** MUI Icon import
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const UserNavbar = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="logo"
          >
            <StorefrontRoundedIcon fontSize="large" />
          </IconButton>
          <TextField
            label="発見"
            variant="outlined"
            size="small"
            InputProps={{
              style: {
                // height: "20px",
                width: "30vw",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
          >
            レビュー
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
            startIcon={<BookmarkIcon />}
          >
            ブックマーク
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
            endIcon={<ExpandMoreIcon />}
          >
            日本語
          </Button>
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
          >
            <AccountCircleOutlinedIcon sx={{fontSize: "50px"}}/>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", marginLeft: "5px" }}>
              nakama.no.team
            </Typography>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
