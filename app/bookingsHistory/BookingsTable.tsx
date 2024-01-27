// components/BookingTable.js
import Image from "next/image";
import Container from "../components/Container";

interface IBooking {
  id: number;
  userId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  imageSrc: string;
}

const BookingTable = ({ bookings }: { bookings: IBooking[] }) => {
  return (
    <Container>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">User ID</th>
              <th className="py-2 px-4 border-b">Room ID</th>
              <th className="py-2 px-4 border-b">Start Date</th>
              <th className="py-2 px-4 border-b">End Date</th>
              <th className="py-2 px-4 border-b">Total Price</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Image</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.userId}</td>
                <td className="py-2 px-4 border-b">{booking.roomId}</td>
                <td className="py-2 px-4 border-b">{booking.startDate}</td>
                <td className="py-2 px-4 border-b">{booking.endDate}</td>
                <td className="py-2 px-4 border-b">{booking.totalPrice}</td>
                <td className="py-2 px-4 border-b">{booking.createdAt}</td>
                <td className="py-2 px-4 border-b">
                  <Image
                    src={booking.imageSrc}
                    alt="Booking"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default BookingTable;
