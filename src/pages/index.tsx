// ** Components import
import { Thumbnail } from "@/@core/components/home/thumbnail";
import { RecommendGroup } from "@/@core/components/home/recommendGroup";
import { GuestNavbar } from "@/@core/components/layouts/navbar/guest";

export default function Home() {
  return (
    <>
      <GuestNavbar />
      <Thumbnail />
      <RecommendGroup />
    </>
  );
}
