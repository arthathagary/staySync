import { getCurrentUsers } from "./actions/getCurrentUser";
import { IListingsParams, getRooms } from "./actions/getRooms";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SearchModal from "./components/modals/SearchModal";
import Navbar from "./components/navbar/NavBar";
import ToasterProvider from "./providers/ToasterProvider";
interface HomeProps {
  searchParams: IListingsParams;
}

import RoomsCard from "./rooms/RoomsCard";
export default async function Home({ searchParams }: HomeProps) {
  const rooms = await getRooms(searchParams);
  console.log(searchParams);
  // const currentUser = await getCurrentUsers();

  return (
    <ClientOnly>
      <div>
        {/* <ToasterProvider />
        <LoginModal />
        <RegisterModal /> */}
        <SearchModal />

        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <Navbar />
      </div>
      <Container>
        <div
          className="
      pt-48
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
    "
        >
          {rooms.map((room: any) => (
            <RoomsCard
              // currentUser={currentUser}
              key={room.id}
              data={room}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
