import { tw } from "twind";
import { Order } from "../../../interfaces/orders";

const OrderCard = ({ order }: { order: Order }) => {
  return (
<div className={tw`w-64 h-56 bg-white rounded-2xl p-6 shadow-lg flex flex-col justify-between`}>      {/* Order Header */}
      <div className={tw`flex justify-between items-center`}>
        <h3 className={tw`text-lg font-bold text-gray-800`}>Pedido #{order.id.slice(0, 8)}</h3>
        <span
          className={tw`px-2 py-1 text-xs font-semibold rounded ${
            order.status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Order Details */}
      <div className={tw`mt-4`}>
      <p className={tw`text-sm text-gray-600`}>
          <span className={tw`font-semibold`}>Total:</span> ${order.totalAmount}
        </p>
        <p className={tw`text-sm text-gray-600`}>
          <span className={tw`font-semibold`}>Productos:</span> {order.productIds.length}
        </p>
      </div>

      {/* Order Footer */}
      <div className={tw`mt-4 flex justify-between items-center`}>
        <p className={tw`text-xs text-gray-500`}>
          Creado: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className={tw`text-xs text-gray-500`}>
          Actualizado: {new Date(order.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;