import { CreateBookingDto, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from "axios";
import { headers } from "next/headers";
export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    queries.getFeaturedRoomQuery,
    {},

    { cache: "no-cache" }
  );
  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    queries.getRoomsQuery,
    {},
    { cache: "no-cache" }
  );
  return result;
}
export async function getRoom(slug: string) {
  const result = await sanityClient.fetch<Room>(
    queries.getRoom,
    { slug },
    { cache: "no-cache" }
  );
  return result;
}

export const createBooking = async ({
  adults,
  numberOfChildren,
  checkinDate,
  checkoutDate,
  user,
  hotelRoom,
  numberOfDays,
  totalPrice,
  discount,
}: CreateBookingDto) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          checkinDate,
          checkoutDate,
          numberOfChildren,
          adults,
          numberOfDays,
          totalPrice,
          discount,
        },
      },
    ],
  };

  const {data} = await  axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-5-8/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );
  return data;
};
