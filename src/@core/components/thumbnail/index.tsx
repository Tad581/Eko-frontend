import { Container, Stack, Typography, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Thumbnail = () => {
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
        いらっさいめせ〜
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
          inputProps={{
            style: {
              height: "30px",
              width: "40vw",
              backgroundColor: "#fff",
              borderRadius: '5px'
            },
          }}
        ></TextField>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          size="large"
          sx={{ width: "120px", height: "45px" }}
        >
          検索
        </Button>
      </Stack>
    </Container>
  );
};
