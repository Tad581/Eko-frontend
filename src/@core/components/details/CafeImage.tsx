// ** MUI Components import
import { Box, Typography } from "@mui/material";

// ** Hooks import

export default function CafeImage() {
  return (
    <Box mt={3}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        写真
      </Typography>
      <Box mt={2}>
        {/* {fakeData.map((item) => (
        <Chip
          key={item.id}
          label={item.name}
          color="primary"
          sx={{ marginRight: 1 }}
        />
      ))} */}
      </Box>
    </Box>
  );
}
