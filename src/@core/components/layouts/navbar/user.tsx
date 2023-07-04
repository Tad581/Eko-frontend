// ** MUI Components import
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

// ** MUI Icons import
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// ** Hooks import
import { useRouter } from "next/router";
import { useState } from "react";

export const UserNavbar = () => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSubmit = () => {
    if (
      router.pathname === "/bookmark"
    )
      router.reload();
    else router.push("/search-results");
    localStorage.setItem("keyword", searchKeyword);
  };

  const handleSubmitEnterKey = (event: any) => {
    if (event.key === "Enter") {
      router.reload();
      localStorage.setItem("keyword", searchKeyword);
    }
  };

  const handleTextChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="logo"
            onClick={() => router.push("/")}
          >
            <StorefrontRoundedIcon fontSize="large" />
          </IconButton>
          <TextField
            label="発見"
            variant="outlined"
            size="small"
            onChange={handleTextChange}
            onKeyDown={handleSubmitEnterKey}
            InputProps={{
              style: {
                // height: "20px",
                width: "30vw",
              },
              endAdornment: (
                <InputAdornment position="end" onClick={handleSubmit}>
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
            onClick={() => router.push("/add-cafe")}
          >
            喫茶店を追加
          </Button>
          <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
            startIcon={<BookmarkIcon />}
            onClick={() => router.push("/bookmark")}
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
          <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
            <AccountCircleOutlinedIcon sx={{ fontSize: "35px" }} />
            <Typography
              sx={{ fontWeight: 600, fontSize: "16px", marginLeft: "5px" }}
            >
              nakama.no.team
            </Typography>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
