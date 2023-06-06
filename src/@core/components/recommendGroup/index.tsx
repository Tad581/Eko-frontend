// ** MUI Components import
import { Grid, Typography, Container } from "@mui/material";
import { CardItemHomePage } from "../cardItem/HomePage";

// ** Interfaces import
import { ICardItemHomePage } from "@/interfaces/cardItem";

// ** Hooks import
import {useState, useEffect} from 'react'

// ** Other import
import { cafesList, sortRating } from "@/@core/utils/cafes";

export const RecommendGroup = () => {
  const [recommendData, setRecommendData] = useState(cafesList)

  useEffect(() => {
    const newData = recommendData.sort(sortRating).slice(0, 9);
    console.log("🚀 ~ file: index.tsx:19 ~ useEffect ~ newData:", newData)
    setRecommendData(newData);
  }, [])


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
              image = {data.image}
              star = {data.star}
            ></CardItemHomePage>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
