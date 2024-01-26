import React from "react";
import { IListingsParams, getRooms } from "../actions/getRooms";
import Container from "../components/Container";
import RoomsCard from "../rooms/RoomsCard";
import ClientOnly from "../components/ClientOnly";
import { decodeToken } from "../actions/DecodeToken";

interface HomeProps {
  searchParams: IListingsParams;
}

const page = async ({ searchParams }: HomeProps) => {
  const rooms = await getRooms(searchParams);

  return (
    <ClientOnly>
      <Container>
        <div
          className="
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
};

export default page;
