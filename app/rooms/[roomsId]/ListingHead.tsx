"use client";

import Image from "next/image";

import usePlaces from "@/app/hooks/usePlaces";

import Heading from "@/app/components/Heading";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: any;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}) => {
  const { getByValue } = usePlaces();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.label}`} />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
      </div>
    </>
  );
};

export default ListingHead;
