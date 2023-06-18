// ** MUI Components import
import { Box, Typography, Chip } from "@mui/material";

// ** Hooks import

const fakeData = [
  {
    id: 1,
    name: "駐車場",
  },
  {
    id: 2,
    name: "エアコン",
  },
  {
    id: 3,
    name: "配送",
  },
];

export default function Devices() {
  return (
    <Box mt={3}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        ユーティリティー
      </Typography>
      <Box mt={2}>
        {fakeData.map((item) => (
          <Chip
            key={item.id}
            label={item.name}
            color="primary"
            sx={{ marginRight: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
