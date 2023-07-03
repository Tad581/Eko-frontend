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
import { useEffect, useState } from "react";

// ** APIs import
import { CafeAPI } from "@/@core/api/cafeApi";

// ** Interfaces import
import { ICafeInfo } from "@/interfaces";

// ** Other import
import { getCurrentHour } from "@/@core/utils/cafes";

export default function Details() {
  const router = useRouter();
  const cafeId = router.query?.id;

  const [cafeDetail, setCafeDetail] = useState<ICafeInfo>({
    address: "",
    closing_at: "",
    current_crowded: 0,
    description: "",
    device: [],
    id: 0,
    name: "",
    owner: undefined,
    owner_ID: 0,
    opening_at: "",
    phone_number: "",
    review: {
      star: 0,
      count: 0,
    },
    status: 0,
    verified: 0,
    images: [""],
    bookmarked: 0
  });

  useEffect(() => {
    const paramsCafe = {
      id: cafeId as unknown as number,
      now: getCurrentHour(),
    };

    if (cafeId !== undefined) {
      (async () => {
        // TODO
        const getOneCafe = await CafeAPI.getOne(paramsCafe);
        setCafeDetail(getOneCafe);
      })();
    }
  }, [cafeId]);

  return (
    <>
      <UserNavbar />
      <Box sx={{ padding: "50px 70px" }}>
        <BasicInfo
          address={cafeDetail.address}
          closing_at={cafeDetail.closing_at}
          current_crowded={cafeDetail.current_crowded}
          description={cafeDetail.description}
          device={cafeDetail.device}
          id={cafeDetail.id}
          name={cafeDetail.name}
          owner={cafeDetail.owner}
          owner_ID={cafeDetail.owner_ID}
          opening_at={cafeDetail.opening_at}
          phone_number={cafeDetail.phone_number}
          review={{
            star: cafeDetail.review.star,
            count: cafeDetail.review.count,
          }}
          status={cafeDetail.status}
          verified={cafeDetail.verified}
          images={cafeDetail.images}
          bookmarked={cafeDetail.bookmarked}
        />
        <Devices propsArray={cafeDetail.device} />
        {cafeDetail.images?.length !== 0 ? (
          <CafeImage images={cafeDetail.images} />
        ) : (
          <></>
        )}
        <Reviews id={cafeId as unknown as number} name={cafeDetail.name} images={cafeDetail.images} address={cafeDetail.address}/>
      </Box>
    </>
  );
}
