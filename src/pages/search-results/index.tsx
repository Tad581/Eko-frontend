// ** MUI Component import
import { Container } from "@mui/material";
// ** Component import
import { FilterBox } from "@/@core/components/filterBox";
import { ResultPagination } from "@/@core/components/paginate";

export default function Home() {
  return (
    <Container
      sx={{
        marginTop: "50px",
        width: "100vw",
        display: "flex",
      }}
    >
      <FilterBox />
      <ResultPagination />
    </Container>
  );
}
