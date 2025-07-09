# Supermarket Management Panel

A modern and elegant supermarket management system built with Next.js, TypeScript, and JSON Server.

## Features

- 🎨 Beautiful UI with light pink and white theme
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🔄 Real-time data fetching with Axios
- 📊 Dashboard with inventory statistics
- ➕ Add new products with form validation
- 🔍 Error handling and loading states

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

2. **Install Axios for API calls:**
   \`\`\`bash
   npm install axios
   # or
   yarn add axios
   \`\`\`

3. **Install JSON Server globally:**
   \`\`\`bash
   npm install -g json-server
   # or
   yarn global add json-server
   \`\`\`

## Running the Application

1. **Start JSON Server (in one terminal):**
   \`\`\`bash
   json-server --watch db.json --port 3001
   \`\`\`
   This will start the JSON Server at `http://localhost:3001`

2. **Start Next.js development server (in another terminal):**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`
   This will start the Next.js app at `http://localhost:3000`

## API Endpoints

The JSON Server provides the following endpoints:

- `GET /products` - Fetch all products
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Usage

1. **Dashboard:** View all products in a beautiful table format with statistics
2. **Add Product:** Click "Add Product" to navigate to the form
3. **Form Submission:** Fill out the form and submit to add a new product
4. **Real-time Updates:** New products appear immediately in the dashboard

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Dashboard page
│   ├── add-product/
│   │   └── page.tsx        # Add product page
│   └── globals.css         # Global styles
├── components/
│   ├── add-product-form.tsx # Add product form component
│   └── product-table.tsx    # Products table component
├── lib/
│   ├── api.ts              # Axios API service
│   ├── types.ts            # TypeScript types
│   └── mock-data.ts        # Mock data (not used with API)
└── db.json                 # JSON Server database
\`\`\`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Axios** - HTTP client
- **JSON Server** - Mock REST API
- **Lucide React** - Icons

## Error Handling

The application includes comprehensive error handling:

- Network connection errors
- API request failures
- Form validation errors
- Loading states with spinners
- User-friendly error messages

## Future Enhancements

- Edit product functionality
- Delete product with confirmation
- Search and filter products
- Bulk operations
- Image upload functionality
- User authentication
- Real database integration
