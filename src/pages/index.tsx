// ** Components import
import { Thumbnail } from "@/@core/components/home/thumbnail";
import { RecommendGroup } from "@/@core/components/home/recommendGroup";
import { UserNavbar } from "@/@core/components/layouts/navbar/user";

export default function Home() {
  return (
    <>
      <UserNavbar />
      <Thumbnail />
      <RecommendGroup />
    </>
  );
}
