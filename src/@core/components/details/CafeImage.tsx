// ** MUI Components import
import { Box, Typography, Card, CardMedia, Grid } from "@mui/material";

// ** Hooks import

interface IProps {
  images: string[];
}

export default function CafeImage(props: IProps) {
  return (
    <Box mt={3}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        写真
      </Typography>
      <Grid container spacing={2} mt={2}>
        {props.images.map((imageUrl: string) => (
          <Grid item sm={3} md={3} lg={3} xl={3}key={imageUrl}>
            <CardMedia
              key={imageUrl}
              sx={{
                aspectRatio: "1 / 1",
                width: "100%",
                borderRadius: "10px",
                border: "1px solid black",
              }}
              image={imageUrl ? imageUrl : "https://i.ibb.co/6WXYg60/cafe.jpg"}
              title="green iguana"
            ></CardMedia>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
