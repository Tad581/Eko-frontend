// ** MUI Components import
import { Box, Typography, Card, CardMedia } from "@mui/material";

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
      <Box display={"flex"} mt={2}>
        {props.images.map((imageUrl: string) => (
          <CardMedia
            key={imageUrl}
            sx={{ height: 300, width: 300, margin: "10px 10px 10px 0", borderRadius: "10px", border: "1px" }}
            image={imageUrl ? imageUrl : "https://i.ibb.co/6WXYg60/cafe.jpg"}
            title="green iguana"
          ></CardMedia>
        ))}
      </Box>
    </Box>
  );
}
