// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/filterBox";

export default function Home() {
  return (
    <Container sx={{marginTop: "50px"}}>
      <FilterBox></FilterBox>
    </Container>
  );
}
