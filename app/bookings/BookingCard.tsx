"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import usePlaces from "@/app/hooks/usePlaces";

import Button from "@/app/components/Button";
import ClientOnly from "@/app/components/ClientOnly";

interface BookingCardProps {
  data: any;
  booking?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

const BookingCard = ({
  data,
  booking,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: BookingCardProps) => {
  const router = useRouter();
  const { getByValue } = usePlaces();

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (booking) {
      return booking.totalPrice;
    }

    return data.price;
  }, [booking, data.price]);

  const bookingDate = useMemo(() => {
    if (!booking) {
      return null;
    }

    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [booking]);

  return (
    <>
      {!data.isBooked && (
        <div
          onClick={() => router.push(`/rooms/${data.id}`)}
          className="col-span-1 cursor-pointer group"
        >
          <div className="flex flex-col gap-2 w-full">
            <div
              className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
            >
              <Image
                fill
                className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
                src={data.imageSrc}
                alt="Rooms"
              />
              <div
                className="
            absolute
            top-3
            right-3
          "
              ></div>
            </div>
            <div className="font-semibold text-lg">{data.locationValue}</div>
            <div className="font-light text-neutral-500">
              {bookingDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
              <div className="font-semibold">$ {price}</div>
              {!booking && <div className="font-light">night</div>}
            </div>
            {onAction && actionLabel && (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
