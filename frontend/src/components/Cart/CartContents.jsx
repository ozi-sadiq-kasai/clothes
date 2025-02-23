import { RiDeleteBin3Line } from "react-icons/ri";

const CartContents = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "T-shirt",
      size: "M",
      color: "red",
      price: 100,
      qty: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "jeans",
      size: "L",
      color: "Blue",
      price: 100,
      qty: 5,
      image: "https://picsum.photos/200?random=1",
    },
  ];
  return (
    <div>
      {cartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex items-start justify-between py-4 border-b border-gray-300"
        >
          <div className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | Color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  {" "}
                  +{" "}
                </button>
                <span className="mx-4">{product.qty}</span>
                <button className="border rounded px-2 py-1 text-xl font-medium cursor-pointer">
                  {" "}
                  -{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="">
        <p className="">${product.price.toLocaleString()}</p>
        <button className="">
            <RiDeleteBin3Line className="h-6 w-6 mt-2 text-fire " />
        </button>
      </div>
        </div>
      ))}
   
    </div>
  );
};

export default CartContents;
