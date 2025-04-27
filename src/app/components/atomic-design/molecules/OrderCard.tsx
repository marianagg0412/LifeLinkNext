import { Order } from '@/interfaces/orders';

const OrderCard = ({ order }: { order: Order }) => {
  return (
<div className={`w-64 h-56 bg-[#FCF7F3] rounded-2xl p-6 shadow-lg flex flex-col justify-between`}>      {/* Order Header */}
      <div className={`flex justify-between items-center`}>
        <h3 className={`text-lg font-bold text-[#F72967]`}>Pedido #{order.id.slice(0, 8)}</h3>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
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
      <div className={`mt-4`}>
      <p className={`text-sm text-[#46C6D7]`}>
          <span className={`font-semibold`}>Total:</span> ${order.totalAmount}
        </p>
        <p className={`text-sm text-[#46C6D7]`}>
          <span className={`font-semibold`}>Productos:</span> {order.productIds.length}
        </p>
      </div>

      {/* Order Footer */}
      <div className={`mt-4 flex justify-between items-center`}>
        <p className={`text-xs text-[#bcacdd]`}>
          Creado: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className={`text-xs text-[#bcacdd]`}>
          Actualizado: {new Date(order.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;