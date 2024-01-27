"use client";
import getRoomsById from "@/app/actions/getRoomsById";
import Button from "@/app/components/Button";
import EditRentModal from "@/app/components/modals/EditRentModal";
import useEditRentModal from "@/app/hooks/useEditRentModal";
import useRentModal from "@/app/hooks/useRentModal";
import React, { useEffect } from "react";

interface IParams {
  roomsId?: string;
}

const RoomGet = ({ params }: { params: IParams }) => {
  const editRentModal = useEditRentModal();

  const [room, setRoom] = React.useState<any>([]);
  useEffect(() => {
    const fetchRoom = async () => {
      const room = await getRoomsById(params);
      console.log(room[0], "rooms");
      setRoom(room[0]);
    };
    fetchRoom();
  }, [params]);

  const handleEdit = (e: any) => {
    e.stopPropagation();
    editRentModal.onOpen();
  };

  return (
    <div className="container mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Room Count</th>
            <th className="py-2 px-4 border-b">Bathroom Count</th>
            <th className="py-2 px-4 border-b">Guest Count</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Booked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">{room.id}</td>
            <td className="py-2 px-4 border-b">{room.title}</td>
            <td className="py-2 px-4 border-b">{room.description}</td>
            <td className="py-2 px-4 border-b">{room.category}</td>
            <td className="py-2 px-4 border-b">{room.roomCount}</td>
            <td className="py-2 px-4 border-b">{room.bathroomCount}</td>
            <td className="py-2 px-4 border-b">{room.guestCount}</td>
            <td className="py-2 px-4 border-b">{room.price}</td>
            <td className="py-2 px-4 border-b">{room.locationValue}</td>
            <td className="py-2 px-4 border-b">
              {room.isBooked ? "Yes" : "No"}
            </td>
          </tr>
        </tbody>
      </table>
      <Button
        // disabled={disabled}
        small
        label="Edit Room"
        onClick={handleEdit}
      />
      <EditRentModal roomId={params.roomsId} />
    </div>
  );
};

export default RoomGet;
