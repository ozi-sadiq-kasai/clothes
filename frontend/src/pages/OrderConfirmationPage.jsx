const checkout = {
  _id: "1222",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      price: 150,
      size: "M",
      quantity: 1,
      image: "https://picsum.photos/158?random=1",
    },
    {
      productId: "2",
      name: "Coat",
      color: "Green",
      size: "Lg",
      price: 200,
      quantity: 1,
      image: "https://picsum.photos/158?random=2",
    },
  ],
  shippingAddress: {
    address: "123 Fashion Street",
    city: "New York",
    country: "USA",
  },
};

// Estimated Delivery Function
const calculateEstimatedDelivery = (createdAt) => {
  const orderDate = new Date(createdAt);
  orderDate.setDate(orderDate.getDate() + 10); //Add 10 days to the orer date

  return orderDate.toLocaleDateString();
};

const OrderConfirmationPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold textc-center text-emerald-700 mb-8">
        {" "}
        Thank You for Your Order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order id and Date */}
            <div>
              <h2 className="text-xl font-semibold">Order ID:{checkout._id}</h2>
              <p className="text-gray-500">
                Order date:{new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Deliver */}
            <div className="">
              <p className="text-emerald-700 text-sm">
                Estimated Delivery:
                {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Orderede Items */}
          <div className="mb-20">
            {checkout.checkoutItems.map((item) => (
              <div key={item.productId} className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="">
                  <h4 className="text-md font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">{item.price}</p>
                  <p className="text-sm text-gray-500">QTY:{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/*Paynent and Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">Paypal</p>
            </div>
            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
            <p className="text-gray-600">{checkout.shippingAddress.address}</p>
            <p className="text-gray-600">{checkout.shippingAddress.city},{" "}{checkout.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
