// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/filterBox";
import { CardItemResultPage } from "@/@core/components/cardItem/ResultPage";

export default function Home() {
  return (
    <Container sx={{ marginTop: "50px", width: "100vw", display: "flex", justifyContent: "space-between"}}>
      <FilterBox />
      <CardItemResultPage />
    </Container>
  );
}
