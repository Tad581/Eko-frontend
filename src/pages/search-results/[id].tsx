// ** MUI Components import
import { Box } from "@mui/material";

// ** Components import
import BasicInfo from "@/@core/components/details/BasicInfo";
import CafeImage from "@/@core/components/details/CafeImage";
import Devices from "@/@core/components/details/Devices";
import Reviews from "@/@core/components/details/Reviews";
import { UserNavbar } from "@/@core/components/layouts/navbar/user";

// ** Hooks import
import { useRouter } from "next/router";

export default function Details() {
  const router = useRouter()

  return (
    <>
      <UserNavbar />
      <Box sx={{ padding: "50px 70px" }}>
        {/* <BasicInfo /> */}
        <Devices />
        <CafeImage />
        <Reviews />
      </Box>
    </>
  );
}
