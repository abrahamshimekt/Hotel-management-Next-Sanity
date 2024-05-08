"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dispatch, FC, SetStateAction } from "react";
import { registerLocale,setDefaultLocale } from "react-datepicker";
import ar from 'date-fns/locale/ar'
registerLocale('ar',ar);
type Props = {
  price: number;
  discount: number;
  specialNote: string;
  checkinDate: Date | null;
  checkoutDate : Date | null;
  setCheckinDate: Dispatch<SetStateAction<Date | null>>;
  setCheckoutDate:Dispatch<SetStateAction<Date | null>>;
  calculateMinCheckoutDate:()=>Date | null;
};
const BookRoomCTA: FC<Props> = (props) => {
  const { price, discount, specialNote, checkinDate, setCheckinDate ,checkoutDate,setCheckoutDate,calculateMinCheckoutDate} = props;
  const discountPrice = price - (price / 100) * discount;

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
            locale="ar"
            selected={checkinDate}
            onChange={(date) => setCheckinDate(date)}
            dateFormat="dd/mm/yy"
            minDate={new Date()}
            id="check-in-date"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary"
          />
        </div>
        <div className="w-1/2 pr-2">
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
    </div>
  );
};

export default BookRoomCTA;
