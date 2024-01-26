import ClientOnly from "@/app/components/ClientOnly";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import RentModal from "@/app/components/modals/RentModal";
import CreateRoom from "@/app/manager/CreateRoom";
import ToasterProvider from "@/app/providers/ToasterProvider";
import Navbar from "../components/navbar/NavBar";
import SearchModal from "../components/modals/SearchModal";

export default async function BookingLayout({
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
          <SearchModal />
          {/* <RentModal /> */}
          <Navbar />
        </div>
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
