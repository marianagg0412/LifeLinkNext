import OrderCard from "@/app/components/atomic-design/molecules/OrderCard";
import { Order } from "@/interfaces/orders";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  return (
    <div className={`mt-6 max-w-4xl w-full bg-[#FCE2DA] p-6 rounded-2xl shadow-md flex flex-col`}>
      {orders.length === 0 ? (
        <p className={`text-center text-gray-600 mt-4`}>No tiene órdenes</p>
      ) : (
        <div className={`flex flex-wrap gap-4`}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;