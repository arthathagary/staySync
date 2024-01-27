"use client";
import React, { useEffect } from "react";
import { IListingsParams, getRooms } from "../actions/getRooms";
import Container from "../components/Container";
import RoomsCard from "../rooms/RoomsCard";
import ClientOnly from "../components/ClientOnly";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { decodeToken } from "../actions/DecodeToken";
import ManagerCard from "./ManagerCard";

interface HomeProps {
  searchParams: IListingsParams;
}

const ManagerPage = () => {
  const [rooms, setRooms] = React.useState([]);
  const [token, setToken] = React.useState<string>("");
  const [userRole, setUserRole] = React.useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt!);
    const fetchRooms = async () => {
      const response = await axios.get("http://localhost:3000/api/rooms");
      const rooms = response.data;
      setRooms(rooms);
    };
    fetchRooms();

    const user = decodeToken(token);
    if (user) {
      setUserRole(user.userRole);
      if (user.userRole !== "manager") {
        toast.error("You are not allowed to access this page");
        router.push("/");
      }
    }
  }, [token, router]);

  if (userRole !== "manager") {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-[#F43F5E] border-solid"></div>
      </div>
    );
  }

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
            <ManagerCard key={room.id} data={room} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default ManagerPage;
