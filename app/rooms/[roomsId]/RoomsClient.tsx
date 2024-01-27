"use client";

import axios from "axios";
import { use, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval, set } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";

import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";
import { getCurrentUsers } from "@/app/actions/getCurrentUser";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IRooms {
  rooms: any;
  reservations?: any;
  currentUser?: any;
}

const RoomsClient = ({ rooms, reservations = [], currentUser }: IRooms) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === rooms.category);
  }, [rooms.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(rooms.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [currentUserId, setCurrentUserId] = useState("");
  const [fullBoard, setFullBoard] = useState(0);
  const [halfBoard, setHalfBoard] = useState(0);
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    const getCurrentUsers = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data) && response.data.length > 0) {
        // Check if the first element has the 'id' property
        if (response.data[0].id) {
          setCurrentUserId(response.data[0].id);
          setCurrentUserName(response.data[0].name);
          return response.data[0];
        } else {
          console.error("Response does not contain 'id' property");
        }
      } else {
        console.error("Response does not contain data array or is empty");
      }
    };
    getCurrentUsers();
  }, [currentUser, loginModal]);

  const onCreateReservation = useCallback(() => {
    if (!currentUserId) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/bookings", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        roomId: rooms?.id,
        userId: currentUserId,
      })
      .then(() => {
        toast.success("Booking reserved!");
        setDateRange(initialDateRange);
        // router.push("/mybookings");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, rooms?.id, currentUserId, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && rooms.price) {
        setTotalPrice((dayCount + 1) * rooms.price + fullBoard + halfBoard);
      } else {
        setTotalPrice(rooms.price);
      }
    }
  }, [dateRange, rooms.price, fullBoard, halfBoard]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={rooms.title}
            imageSrc={rooms.imageSrc}
            locationValue={rooms.locationValue}
            id={rooms.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              currentUserName={currentUserName}
              category={category}
              description={rooms.description}
              roomCount={rooms.roomCount}
              guestCount={rooms.guestCount}
              bathroomCount={rooms.bathroomCount}
              locationValue={rooms.locationValue}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={rooms.price}
                halfBoardPrice={rooms.halfBoardPrice}
                fullBoardPrice={rooms.fullBoardPrice}
                totalPrice={totalPrice}
                onChangeDate={(value: any) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
                setFullBoard={(value: any) => setFullBoard(value)}
                setHalfBoard={(value: any) => setHalfBoard(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RoomsClient;
