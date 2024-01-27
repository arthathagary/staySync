"use client";

import { Range } from "react-date-range";

import Button from "@/app/components/Button";
import Calendar from "@/app/components/inputs/Calendar";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  setFullBoard: (value: number) => void;
  setHalfBoard: (value: number) => void;
  halfBoardPrice: number;
  fullBoardPrice: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  setFullBoard,
  setHalfBoard,
  halfBoardPrice,
  fullBoardPrice,
}) => {
  const handleOptionChange = (option: any) => {
    if (option === "full") {
      setHalfBoard(0); // Reset halfBoard if fullBoard is selected
      setFullBoard(fullBoardPrice);
    } else if (option === "half") {
      setFullBoard(0); // Reset fullboard if fullBoard is selected
      setHalfBoard(halfBoardPrice);
    }
  };
  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 justify-center">
            <div className="font-bold">Select Board Option</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="boardOption"
                value="full"
                onChange={() => handleOptionChange("full")}
              />
              <span className="ml-1">
                Full Board{" "}
                <span className="font-bold">({fullBoardPrice}/-)</span>
              </span>
            </label>
          </div>
          <div className="flex flex-col justify-center items-center">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="boardOption"
                value="half"
                onChange={() => handleOptionChange("half")}
              />
              <span className="ml-1">
                Half Board{" "}
                <span className="font-bold">({halfBoardPrice}/-)</span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
