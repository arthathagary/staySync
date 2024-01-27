// import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
// import RentModal from "../components/modals/RentModal";
// import SearchModal from "../components/modals/SearchModal";
import Navbar from "@/app/components/navbar/NavBar";
import ToasterProvider from "../providers/ToasterProvider";
import RentModal from "../components/modals/RentModal";
import CreateRoom from "../manager/CreateRoom";
import EditRentModal from "../components/modals/EditRentModal";

export default async function AllRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const currentUser = await getCurrentUser();

  return (
    <>
      <ClientOnly>
        <div>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          {/* <SearchModal /> */}
          <RentModal />

          {/* <CreateRoom currentUser={currentUser} /> */}
          <CreateRoom />
        </div>
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
