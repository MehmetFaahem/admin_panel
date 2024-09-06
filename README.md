This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Overview

This project is a comprehensive admin panel built using Next.js, designed to manage products, customers, and orders efficiently. The application leverages several modern libraries and tools to provide a robust and user-friendly interface.

### Libraries and Tools Used

- **Next.js**: A powerful React framework for building server-side rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making API requests.
- **Chart.js**: A simple yet flexible JavaScript library for building charts.
- **React-chartjs-2**: A library for building charts in React, providing a simple way to handle form state and validation.
- **Formik**: A library for building forms in React, providing a simple way to handle form state and validation.
- **Yup**: A JavaScript schema builder for value parsing and validation, used in conjunction with Formik.
- **Radix UI**: A set of low-level, accessible UI components for building high-quality design systems and web applications.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Skeleton**: A simple, customizable loading placeholder component to enhance the user experience during data fetching.

### API Routes

This project includes several API routes to handle data fetching and manipulation. These routes are defined in the `pages/api` directory and are used to simulate interactions with a backend server. The API routes are designed to provide a seamless experience for managing products, customers, and orders.

#### Available API Routes

- **GET /api/data**: Fetches mock data for products, customers, and orders. This route is used to populate the admin panel with initial data.

### Key Features

- **Product Management**: Add, edit, and delete products with ease. Each product includes details such as name, price, and description.
- **Customer Management**: Manage customer information, including name, email, and phone number. The application supports adding new customers and viewing detailed customer profiles.
- **Order Management**: View and manage customer orders, including order details and associated products.

### Component Structure

- **AdminLayout**: The main layout component for the admin panel, providing a consistent structure and styling across all pages.
- **Table**: A set of components (`Table`, `TableBody`, `TableCell`, `TableHead`, `TableHeader`, `TableRow`) for displaying tabular data.
- **Dialog**: A set of components (`Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`) for creating modal dialogs.
- **Input**: A customizable input component for form fields.
- **Button**: A reusable button component with various styling options.
- **Card**: A set of components (`Card`, `CardContent`, `CardTitle`, `CardDescription`) for displaying content in a card layout.
- **Skeleton**: A loading placeholder component to indicate content loading.

### Data Management

The application uses a mock data file (`fetchData.js`) to simulate API responses for products, customers, and orders. This allows for easy testing and development without the need for a backend server.

### How to Use

1. **Run the Development Server**: Start the development server using `npm run dev`, `yarn dev`, `pnpm dev`, or `bun dev`.
2. **Access the Admin Panel**: Open [http://localhost:3000](http://localhost:3000) in your browser to access the admin panel.
3. **Manage Data**: Use the provided interface to manage products, customers, and orders. The application supports adding, editing, and deleting records.

### Future Enhancements

- **API Integration**: Replace the mock data with real API endpoints to fetch and manage data from a backend server.
- **Authentication**: Implement user authentication and authorization to secure the admin panel.
- **Advanced Features**: Add more advanced features such as search, filtering, and sorting for better data management.

This project serves as a solid foundation for building a fully functional admin panel with modern web technologies.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
