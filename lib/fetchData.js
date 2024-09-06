const data = {
  products: [
    {
      id: 1,
      name: "Smartphone X",
      description: "Latest model with advanced features",
      price: 999,
    },
    {
      id: 2,
      name: "Laptop Pro",
      description: "High-performance laptop for professionals",
      price: 1499,
    },
    {
      id: 3,
      name: "Wireless Earbuds",
      description: "True wireless earbuds with noise cancellation",
      price: 199,
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Fitness tracker and smartwatch combo",
      price: 299,
    },
    {
      id: 5,
      name: "4K TV",
      description: "Ultra HD smart TV with HDR",
      price: 799,
    },
  ],
  customers: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1987654321",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "+1122334455",
    },
  ],
  orders: [
    {
      id: 1,
      customer: "John Doe",
      total: 1198,
      products: [
        { id: 1, name: "Smartphone X", price: 999 },
        { id: 3, name: "Wireless Earbuds", price: 199 },
      ],
    },
    {
      id: 2,
      customer: "Jane Smith",
      total: 1798,
      products: [
        { id: 2, name: "Laptop Pro", price: 1499 },
        { id: 4, name: "Smart Watch", price: 299 },
      ],
    },
  ],
};

export default async function fetchData(type) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data[type]);
    }, 1000);
  });
}
