// ** Components import
import { Thumbnail } from "@/@core/components/thumbnail";
import { RecommendGroup } from "@/@core/components/recommendGroup";
import { GuestNavbar } from "@/@core/components/navbar/guest";

export default function Home() {
  return (
    <>
      <GuestNavbar />
      <Thumbnail />
      <RecommendGroup />
    </>
  );
}
