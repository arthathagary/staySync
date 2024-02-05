import axios from "axios";
export interface IListingsParams {
  // userId?: string | number;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  category?: string;
}

//getting rooms details from db
export const getRooms = async (params: IListingsParams) => {
  const {
    // userId,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    category,
  } = params;

  let query: any = {};

  // if (userId) {
  //   query.userId = userId;
  // }

  if (category) {
    query.category = category;
  }

  if (roomCount) {
    query.roomCount = {
      gte: +roomCount,
    };
  }

  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }

  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  const response = await axios.get("http://localhost:3000/api/rooms", {
    params: query,
  });
  return response.data;
};
