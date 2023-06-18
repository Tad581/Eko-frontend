// ** MUI Components import
import { Grid, Typography, Container } from "@mui/material";
import { CardItemHomePage } from "../../layouts/cardItem/HomePage";

// ** Interfaces import
import { ICafeInfo } from "@/interfaces";

// ** Hooks import
import { useState, useEffect } from "react";

// ** APIs import
import { CafeAPI } from "@/@core/api/cafeApi";

export const RecommendGroup = () => {
  const [recommendData, setRecommendData] = useState([]);

  useEffect(() => {
    (async () => {
      const getAllCafe = await CafeAPI.getAll({ orderBy: "avg_star", orderType: "asc"});
      setRecommendData(getAllCafe.data.slice(0, 9));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        {recommendData?.map((data: ICafeInfo) => (
          <Grid item sm={6} md={4} lg={4} key={data.id}>
            <CardItemHomePage
              address={data.address}
              closing_at={data.closing_at}
              current_crowded={data.current_crowded}
              description={data.description}
              device={data.device}
              id={data.id}
              name={data.name}
              owner={data.owner}
              owner_ID={data.owner_ID}
              phone_number={data.phone_number}
              review={data.review}
              status={data.status}
              verified={data.verified}
              images={data.images}
            ></CardItemHomePage>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
