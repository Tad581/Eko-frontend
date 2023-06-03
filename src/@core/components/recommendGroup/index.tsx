import { Grid, Typography, Container } from "@mui/material";
import { CardItemHomePage } from "../cardItem/HomePage";

import { ICardItemHomePage } from "@/interfaces/cardItem";

const recommendData: ICardItemHomePage[] = [
  {
    id: 1,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  { id: 2, name: "カフェの名前", address: "カフェの食わし場所" },
  {
    id: 3,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 4,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 5,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 6,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 7,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 8,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
  {
    id: 9,
    name: "カフェの名前",
    address: "カフェの食わし場所",
  },
];

export const RecommendGroup = () => {
  return (
    <Container maxWidth="xl">
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        mt={3}
        sx={{ fontWeight: 700, fontSize: "24px" }}
      >
        おすすめのカフェ
      </Typography>
      <Grid container spacing={2}>
        {recommendData.map((data: ICardItemHomePage) => (
          <Grid item sm={6} md={4} lg={4} key={data.id}>
            <CardItemHomePage
              id={data.id}
              name={data.name}
              address={data.address}
            ></CardItemHomePage>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
