// ** MUI Components import
import { Box, Typography, Chip } from "@mui/material";

// ** Hooks import

interface IProps {
  propsArray: { id: number; name: string; quantity: number; status: string }[];
}

export default function Devices(props: IProps) {
  return (
    <Box mt={3}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        ユーティリティー
      </Typography>
      <Box mt={2}>
        {props.propsArray.map((device: any) => (
          <Chip
            key={device.id}
            label={device.name}
            color="primary"
            sx={{ marginRight: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
}
