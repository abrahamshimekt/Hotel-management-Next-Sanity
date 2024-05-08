"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, FC, SetStateAction } from "react";
type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkinDate: Date | null;
  checkoutDate: Date | null;
  adults: number;
  numberOfChildren: number;
  isBooked: boolean;
  handleBookNow: () => void;
  setAdults: Dispatch<SetStateAction<number>>;
  setNumberOfChildren: Dispatch<SetStateAction<number>>;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  setCheckoutDate: Dispatch<SetStateAction<Date | null>>;
  calculateMinCheckoutDate: () => Date | null;
};
const BookRoomCTA: FC<Props> = (props) => {
  const {
    price,
    discount,
    specialNote,
    checkinDate,
    setCheckinDate,
    checkoutDate,
    setCheckoutDate,
    calculateMinCheckoutDate,
    adults,
    setAdults,
    numberOfChildren,
    setNumberOfChildren,
    isBooked,
    handleBookNow,
  } = props;
  const discountPrice = price - (price / 100) * discount;
  const calcNumOfDays = () => {
    if (!checkinDate || !checkoutDate) return 0;
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const numberOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return numberOfDays;
  };

  return (
    <div className="px-7 py-6">
      <h3>
        <span
          className={`${discount ? "text-gray-400" : " "} font-bold text-xl`}
        >
          ${price}{" "}
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            | discount {discount}%. Now{" "}
            <span className="text-tertiary-dark">${discountPrice}</span>
          </span>
        ) : (
          " "
        )}
      </h3>

      <div className="w-full border-b-2 border-b-secondary  my-2" />
      <h3 className="my-8">{specialNote}</h3>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400 focus:border-primary"
          >
            Check In Date
          </label>
          <DatePicker
         
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/mm/yy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-date"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400 focus:border-primary"
          >
            Check out Date
          </label>
          <DatePicker
            selected={checkoutDate}
            onChange={(date) => setCheckoutDate(date)}
            dateFormat="dd/mm/yy"
            disabled={!checkinDate}
            minDate={calculateMinCheckoutDate()}
            id="check-out-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            min={1}
            max={5}
            onChange={(event) => setAdults(+event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        {/* children */}
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            value={numberOfChildren}
            min={1}
            max={3}
            onChange={(event) => setNumberOfChildren(+event.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
      </div>
      {calcNumOfDays() > 0 ? (
        <p className="mt-3"> Total Price: ${calcNumOfDays() * discount}</p>
      ) : (
        <></>
      )}

      <button
        disabled={isBooked}
        onClick={handleBookNow}
        className="btn-primary w-full mt-6 disabled: bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default BookRoomCTA;
