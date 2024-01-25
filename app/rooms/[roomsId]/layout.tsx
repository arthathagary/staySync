import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/NavBar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import ClientOnly from "@/app/components/ClientOnly";

export default async function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientOnly>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <RentModal />
        <Navbar />
      </ClientOnly>
      <div className="pb-20 pt-28">{children}</div>
    </>
  );
}
