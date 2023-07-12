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
  Popper,
} from "@mui/material";

// ** MUI Icons import
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

// ** Hooks import
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const UserNavbar = () => {
  const router = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    const keywordTemp = localStorage.getItem("keyword") || "";
    setSearchKeyword(keywordTemp);
  }, [])

  const handleSubmit = () => {
    if (router.pathname === "/search-results"){
      router.reload();
    }
    else{
      router.push("/search-results");
    }
    localStorage.setItem("keyword", searchKeyword);
  };

  const handleSubmitEnterKey = (event: any) => {
    if (event.key === "Enter") {
      if (router.pathname === "/search-results"){
        router.reload();
      }
      else{
        router.push("/search-results");
      }
      localStorage.setItem("keyword", searchKeyword);
    }
  };

  const handleTextChange = (e: any) => {
    setSearchKeyword(e.target.value);
    console.log(e.target.value);
    
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
            label={searchKeyword ? "" : "発見"}
            variant="outlined"
            size="small"
            onChange={handleTextChange}
            onKeyDown={handleSubmitEnterKey}
            value={searchKeyword}
            InputProps={{
              style: {
                // height: "20px",
                width: "30vw",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon onClick={handleSubmit}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </Box>

        <Stack direction="row" spacing={2}>
          {/* <Button
            variant="contained"
            size="medium"
            sx={{ minWidth: "100px", fontWeight: 700 }}
          >
            レビュー
          </Button> */}
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
          <Box>
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              display={"flex"}
              onClick={handleClick}
            >
              <AccountCircleOutlinedIcon sx={{ fontSize: "35px" }} />
              <Typography
                sx={{ fontWeight: 600, fontSize: "16px", marginLeft: "5px" }}
              >
                nakama.no.team
              </Typography>
            </Box>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box
                sx={{
                  marginLeft: "25px",
                  marginTop: "20px",
                  p: 1,
                  bgcolor: "background.paper",
                  width: "180px",
                  height: "50px",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                }}
              >
                <Typography
                  onClick={() => router.push("/add-cafe")}
                  sx={{
                    cursor: "pointer",
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  喫茶店の追加
                </Typography>
              </Box>
            </Popper>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
