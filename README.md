# Burger Cafe Backend API

A comprehensive restaurant management system built with NestJS, providing full CRUD operations for managing a burger cafe's digital presence and operations.

## 🚀 Features

- **Menu Management** - Complete CRUD operations for menu items
- **Order Management** - Handle orders with status tracking and filtering
- **Reservation System** - Manage table reservations with date filtering
- **Shopping Cart** - Session-based cart management
- **About Us** - Story and team member management
- **Cafe Details** - Statistics and information management
- **FAQ System** - Frequently asked questions with admin/public views
- **Contact Management** - Handle customer inquiries with status tracking
- **Comments System** - Customer reviews and feedback
- **Footer Management** - Contact information and social media links
- **Gallery** - Image gallery with categories

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Validation**: Class Validator
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- PostgreSQL database
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd burger-cafe-back
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=burger_cafe
   ```

4. **Database Setup**
   - Create a PostgreSQL database named `burger_cafe`
   - Update the database credentials in your `.env` file

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### API Endpoints

#### Menu Management (`/menu`)
- `GET /menu` - Get all menu items
- `GET /menu/:id` - Get menu item by ID
- `POST /menu` - Create new menu item
- `PATCH /menu/:id` - Update menu item
- `DELETE /menu/:id` - Delete menu item

**Menu Item Schema:**
```json
{
  "name": "string",
  "price": "number",
  "description": "string",
  "image": "string",
  "category": "string",
  "duration": "number"
}
```

#### Order Management (`/orders`)
- `GET /orders` - Get all orders
- `GET /orders?status=status` - Get orders by status
- `GET /orders?orderType=type` - Get orders by type
- `GET /orders/order-number/:orderNumber` - Get order by order number
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order
- `PATCH /orders/:id/status` - Update order status
- `DELETE /orders/:id` - Delete order

**Order Types:** `dine_in`, `takeaway`, `delivery`

**Order Schema:**
```json
{
  "customerName": "string",
  "customerPhone": "string",
  "customerEmail": "string (optional)",
  "orderType": "dine_in | takeaway | delivery",
  "items": "array",
  "subtotal": "number",
  "deliveryFee": "number (optional)",
  "tax": "number (optional)",
  "total": "number",
  "specialInstructions": "string (optional)",
  "deliveryAddress": "string (optional)"
}
```

#### Reservation Management (`/reservation`)
- `GET /reservation` - Get all reservations
- `GET /reservation?date=YYYY-MM-DD` - Get reservations by date
- `GET /reservation/:id` - Get reservation by ID
- `POST /reservation` - Create new reservation
- `PATCH /reservation/:id` - Update reservation
- `PATCH /reservation/:id/status` - Update reservation status
- `DELETE /reservation/:id` - Delete reservation

**Reservation Schema:**
```json
{
  "fullName": "string",
  "phoneNumber": "string",
  "email": "string (optional)",
  "date": "string (ISO date)",
  "time": "string",
  "customerCount": "number",
  "specialRequest": "string (optional)"
}
```

#### Cart Management (`/cart`)
- `GET /cart?sessionId=sessionId` - Get cart by session ID
- `GET /cart/total?sessionId=sessionId` - Get cart total
- `GET /cart/:id` - Get cart item by ID
- `POST /cart` - Add item to cart
- `PATCH /cart/:id` - Update cart item
- `PATCH /cart/:id/quantity` - Update item quantity
- `DELETE /cart/:id` - Remove cart item
- `DELETE /cart/session/:sessionId` - Clear cart session

**Cart Item Schema:**
```json
{
  "sessionId": "string",
  "foodId": "number",
  "foodName": "string",
  "foodPrice": "number",
  "quantity": "number",
  "specialInstructions": "string (optional)"
}
```

#### About Us Management (`/about-us`)

**Story Management:**
- `GET /about-us/story` - Get story
- `POST /about-us/story` - Create story
- `PATCH /about-us/story/:id` - Update story
- `DELETE /about-us/story/:id` - Delete story

**Team Management:**
- `GET /about-us/team` - Get all team members
- `GET /about-us/team/:id` - Get team member by ID
- `POST /about-us/team` - Create team member
- `PATCH /about-us/team/:id` - Update team member
- `DELETE /about-us/team/:id` - Delete team member

**Team Member Schema:**
```json
{
  "name": "string",
  "position": "string",
  "experience": "number",
  "skills": "string (optional)",
  "image": "string (optional)"
}
```

#### Cafe Details Management (`/cafe-details`)
- `GET /cafe-details` - Get all cafe details
- `GET /cafe-details/:id` - Get cafe details by ID
- `POST /cafe-details` - Create cafe details
- `PATCH /cafe-details/:id` - Update cafe details
- `DELETE /cafe-details/:id` - Delete cafe details

**Cafe Details Schema:**
```json
{
  "kindOfBurgers": "number",
  "experience": "number",
  "rate": "number",
  "customers": "number"
}
```

#### FAQ Management (`/faq`)
- `GET /faq` - Get all FAQs (public)
- `GET /faq/admin` - Get all FAQs (admin)
- `GET /faq/:id` - Get FAQ by ID
- `POST /faq` - Create FAQ
- `PATCH /faq/:id` - Update FAQ
- `DELETE /faq/:id` - Delete FAQ

**FAQ Schema:**
```json
{
  "question": "string",
  "answer": "string",
  "order": "number (optional)",
  "isActive": "boolean (optional)"
}
```

#### Contact Us Management (`/contact-us`)
- `GET /contact-us` - Get all contact messages
- `GET /contact-us?status=status` - Get messages by status
- `GET /contact-us/:id` - Get message by ID
- `POST /contact-us` - Create contact message
- `PATCH /contact-us/:id` - Update message
- `PATCH /contact-us/:id/status` - Update message status
- `DELETE /contact-us/:id` - Delete message

**Contact Message Schema:**
```json
{
  "fullName": "string",
  "email": "string",
  "phoneNumber": "string",
  "subject": "string",
  "message": "string"
}
```

#### Comments Management (`/comments`)
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get comment by ID
- `POST /comments` - Create comment
- `PATCH /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

**Comment Schema:**
```json
{
  "content": "string",
  "rating": "number",
  "authorName": "string",
  "authorJob": "string (optional)",
  "authorImage": "string (optional)"
}
```

#### Footer Management (`/footer`)
- `GET /footer` - Get all footer info
- `GET /footer/:id` - Get footer info by ID
- `POST /footer` - Create footer info
- `PATCH /footer/:id` - Update footer info
- `DELETE /footer/:id` - Delete footer info

**Footer Schema:**
```json
{
  "phoneNumber": "string",
  "email": "string",
  "address": "string",
  "workTime": "string",
  "currentLocation": "string",
  "instagram": "string (optional)",
  "facebook": "string (optional)",
  "twitter": "string (optional)"
}
```

#### Gallery Management (`/gallery`)

**Categories:**
- `GET /gallery/categories` - Get all categories
- `GET /gallery/categories/:id` - Get category by ID
- `POST /gallery/categories` - Create category
- `PATCH /gallery/categories/:id` - Update category
- `DELETE /gallery/categories/:id` - Delete category

**Items:**
- `GET /gallery/items` - Get all gallery items
- `GET /gallery/items/category/:categoryId` - Get items by category
- `GET /gallery/items/:id` - Get item by ID
- `POST /gallery/items` - Create gallery item
- `PATCH /gallery/items/:id` - Update item
- `DELETE /gallery/items/:id` - Delete item

**Gallery Item Schema:**
```json
{
  "title": "string",
  "description": "string",
  "imageUrl": "string",
  "categoryId": "number"
}
```

## 🧪 Testing with Postman

1. **Import the Collection**
   - Open Postman
   - Click "Import" and select `Burger_Cafe_API.postman_collection.json`
   - The collection will be imported with all endpoints organized by modules

2. **Set Environment Variables**
   - Create a new environment in Postman
   - Add variable: `baseUrl` = `http://localhost:3000`

3. **Test Endpoints**
   - All endpoints include example request bodies
   - Start with GET requests to retrieve data
   - Use POST requests to create new records
   - Use PATCH requests to update existing records
   - Use DELETE requests to remove records

## 🔧 Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start in development mode with hot reload
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

### Project Structure

```
src/
├── about-us/              # About us module
├── cafe-details/          # Cafe details module
├── cart/                  # Shopping cart module
├── comments/              # Comments module
├── contact-us/            # Contact us module
├── faq/                   # FAQ module
├── footer/                # Footer module
├── gallery/               # Gallery module
├── menu/                  # Menu module
├── orders/                # Orders module
├── reservation/           # Reservation module
├── app.module.ts          # Main application module
├── main.ts                # Application entry point
└── app.controller.ts      # Main application controller
```

## 🚀 Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```env
   PORT=3000
   NODE_ENV=production
   DB_HOST=your_production_db_host
   DB_PORT=5432
   DB_USERNAME=your_production_username
   DB_PASSWORD=your_production_password
   DB_NAME=your_production_db_name
   ```

3. **Start the application**
   ```bash
   npm run start:prod
   ```

## 📝 API Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "data": "response_data",
  "message": "Success message (optional)",
  "statusCode": 200
}
```

**Error Response:**
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

## 🔒 Validation

The API uses class-validator for request validation. All DTOs include proper validation decorators:

- `@IsString()` - Validates string type
- `@IsNumber()` - Validates number type
- `@IsEmail()` - Validates email format
- `@IsNotEmpty()` - Ensures field is not empty
- `@IsOptional()` - Makes field optional
- `@IsEnum()` - Validates against enum values
- `@IsArray()` - Validates array type
- `@IsDateString()` - Validates date string format
- `@IsBoolean()` - Validates boolean type

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED License.

## 📞 Support

For support and questions, please contact us through the contact form API endpoint or create an issue in the repository.

---

**Happy Coding! 🍔☕**