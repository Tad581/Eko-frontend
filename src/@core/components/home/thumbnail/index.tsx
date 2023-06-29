// ** MUI Components import
import { Container, Stack, Typography, TextField, Button } from "@mui/material";

// ** MUI Icons import
import SearchIcon from "@mui/icons-material/Search";

// ** Hooks import
import { useRouter } from "next/router";
import { useState } from "react";

export const Thumbnail = () => {
  const { push } = useRouter();

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleSubmit = () => {
    push("/search-results");
    localStorage.setItem("keyword", searchKeyword);
  };

  const handleSubmitEnterKey = (event: any) => {
    if (event.key === "Enter") {
      push("/search-results");
      localStorage.setItem("keyword", searchKeyword);
    }
  };

  const handleTextChange = (e: any) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <Container
      sx={{
        backgroundColor: "#bcc7f7",
        minWidth: "100vw",
        height: "40vh",
        display: " flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography align="center" mb={5} sx={{ fontWeight: 600, fontSize: 40 }}>
        いらっしゃいませ〜
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <TextField
          label="名前"
          variant="outlined"
          size="small"
          value={searchKeyword}
          onChange={handleTextChange}
          onKeyDown={handleSubmitEnterKey}
          inputProps={{
            style: {
              height: "30px",
              width: "40vw",
              backgroundColor: "#fff",
              borderRadius: "5px",
            },
          }}
        ></TextField>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          size="large"
          sx={{ width: "120px", height: "45px" }}
          onClick={handleSubmit}
        >
          検索
        </Button>
      </Stack>
    </Container>
  );
};
