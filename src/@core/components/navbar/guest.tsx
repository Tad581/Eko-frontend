// ** MUI Component import
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";

// ** MUI Icon import
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const GuestNavbar = () => {
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="primary" aria-label="logo">
          <StorefrontRoundedIcon fontSize="large" />
          <Typography variant="h6" component="div" sx={{ marginLeft: "10px" }}>
            eko
          </Typography>
        </IconButton>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
            endIcon={<ExpandMoreIcon />}
          >
            日本語
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
          >
            登録
          </Button>
          <Button
            variant="outlined"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
          >
            ログイン
          </Button>

        </Stack>
      </Toolbar>
    </AppBar>
  );
};
