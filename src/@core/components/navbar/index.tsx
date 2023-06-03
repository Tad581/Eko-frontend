import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";

export const Navbar = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton size="large" edge="start" color="primary" aria-label="logo">
          <StorefrontRoundedIcon />
          <Typography variant="h6" component="div" sx={{ marginLeft: "10px" }}>
            eko
          </Typography>
        </IconButton>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
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
