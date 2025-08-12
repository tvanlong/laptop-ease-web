<br />
<div align="center">
  <a href="https://github.com/tvanlong/laptop-ease-web">
    <img src="store/src/assets/images/logo_header.png"  style="background-color:black;border-radius: 50%" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Laptop Ease</h3>

  <p align="center">
    Your one-stop destination for laptop shopping and reviews!
    <br />
    <a href="https://github.com/tvanlong/laptop-ease-web"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://laptop-ease-web.vercel.app">View Demo</a>
    &middot;
    <a href="https://github.com/tvanlong/laptop-ease-web/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/tvanlong/laptop-ease-web/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<a name="table-of-contents"></a>

## Table of contents

-   [Table of contents](#table-of-contents)
-   [Description](#description)
-   [Features](#features)
-   [Installation](#installation)
    -   [Requirements](#requirements)
    -   [Clone the project](#clone-the-project)
    -   [Environment setup](#environment-setup)
    -   [Database setup](#database-setup)
    -   [Build and run](#build-and-run)
-   [Usage](#usage)
    -   [For customers](#for-customers)
    -   [For administrators](#for-administrators)
    -   [API endpoints](#api-endpoints)
-   [Configuration](#configuration)
    -   [Environment variables](#environment-variables)
    -   [Database configuration](#database-configuration)
    -   [Payment gateway setup](#payment-gateway-setup)
-   [Development](#development)
    -   [Project structure](#project-structure)
    -   [Contributing](#contributing)
    -   [Testing](#testing)
-   [Deployment](#deployment)
    -   [Frontend deployment with Vercel](#frontend-deployment-with-vercel)
    -   [Backend deployment with Render](#backend-deployment-with-render)
    -   [Database setup with MongoDB Atlas](#database-setup-with-mongodb-atlas)
-   [TODO](#todo)
-   [License](#license)

<a name="description"></a>

## Description

Laptop Ease is a comprehensive e-commerce platform specifically designed for laptop shopping. Built with modern web technologies, it provides a seamless shopping experience with detailed product information, user reviews, comparison tools, and secure payment processing. The platform caters to both tech enthusiasts looking for detailed specifications and casual users seeking simple laptop recommendations.

<img src="docs/screenshot.png" alt="Screenshot of Homepage" />

<a name="features"></a>

## Features

- **Product Catalog**: Extensive laptop database with detailed specifications
- **Advanced Search & Filtering**: Filter by brand, price range, specifications, and user ratings
- **Product Comparison**: Side-by-side comparison of multiple laptops
- **User Reviews & Ratings**: Community-driven reviews and rating system (Coming soon...)
- **Shopping Cart & Wishlist**: Save items for later and manage purchases
- **Secure Checkout**: Multiple payment options with secure processing
- **User Accounts**: Profile management, order history, and preferences
- **Admin Dashboard**: Inventory management, order processing, and analytics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Notifications**: Order updates and promotional alerts (Coming soon...)

<a name="installation"></a>

## Installation

<a name="requirements"></a>

### Requirements

- Node.js (v16.0 or higher)
- npm or yarn package manager (highly recommend NPM)
- MongoDB Atlas account
- React.js
- TailwindCSS (v3)

### Clone the project

```bash
git clone https://github.com/your-username/laptop-ease.git
cd laptop-ease
```

### Environment setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### Database setup

Set up your MongoDB Atlas cluster and obtain the connection string:

1. Create a MongoDB Atlas account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Set up database user credentials
4. Whitelist your IP address
5. Get the connection string

### Build and run

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

<a name="usage"></a>

## Usage

### For customers

Access the website at `http://localhost:3000` (or your configured domain) to:

- Browse laptop collections by category or brand
- Use advanced filters to find laptops matching specific requirements
- Read and write product reviews
- Compare multiple laptops side-by-side
- Add items to cart and complete secure checkout
- Track order status and history

<img src="docs/screenshot_product.png" alt="Screenshot of Product page" />

### For administrators

Access the admin panel at `http://localhost:3000/admin` to:

- Manage product inventory and specifications
- Process orders and update shipping status
- Monitor user reviews and ratings (coming soon...)
- View sales analytics and reports
- Manage user accounts and permissions
- Configure site settings and promotions

<img src="docs/screenshot_admin_dashboard.png" alt="Screenshot of Admin Dashboard" />

### API endpoints

The platform provides RESTful API endpoints for integration:

- `GET /api/products` - Retrieve product listings
- `POST /api/products` - Add new products (admin only)
- `GET /api/products/:id` - Get product details
- `POST /api/orders` - Create new orders
- `GET /api/orders/:id` - Track order status

<a name="configuration"></a>

## Configuration

### Environment variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `APP_PORT` | Server port number | `3000` |
| `NODE_ENV` | Environment mode | `development` |
| `URL_CLIENT` | Client application URL (development) | `http://localhost:5173` |
| `URL_ADMIN` | Admin panel URL (development) | `http://localhost:3001` |
| `URL_CLIENT_DEPLOY` | Client application URL (production) | |
| `URL_ADMIN_DEPLOY` | Admin panel URL (production) | |
| `URL_API_DEPLOY` | API server URL (production) | |
| `MONGO_ATLAS_URI` | MongoDB Atlas connection string | |
| `JWT_ACCESS_TOKEN` | Secret key for JWT access tokens | `myaccesstoken` |
| `JWT_REFRESH_TOKEN` | Secret key for JWT refresh tokens | `myrefreshtoken` |
| `JWT_ACCOUNT_VERIFY` | Secret key for account verification tokens | `myaccountverify` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | |
| `FACEBOOK_APP_SECRET` | Facebook OAuth app secret | |
| `NAME` | SMTP server name | `smtp.gmail.com` |
| `HOST` | SMTP server host | `smtp.gmail.com` |
| `SERVICE` | Email service provider | `gmail` |
| `USER` | Email username for SMTP | |
| `PASS` | Email password for SMTP | |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | |
| `CLOUDINARY_API_KEY` | Cloudinary API key | |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | |
| `CLOUDINARY_API_ENV` | Cloudinary environment variable | |
| `ACCESS_KEY_MOMO` | MoMo access key | `F8BBA842ECF85` |
| `SECRET_KEY_MOMO` | MoMo secret key | `K951B6PE1waDMi640xX08PD3vg6EkVlz` |
| `PARTNER_CODE_MOMO` | MoMo partner code | `MOMO` |
| `IPN_URL_MOMO_NGROK` | MoMo IPN URL for ngrok testing | |
| `ZALOPAY_APP_ID` | ZaloPay application ID | `2554` |
| `ZALOPAY_KEY1` | ZaloPay key1 for authentication | `sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn` |
| `ZALOPAY_KEY2` | ZaloPay key2 for authentication | `trMrHtvjo6myautxDUiAcYsVtaeQ8nhf` |
| `ZALOPAY_ENDPOINT_CREATE` | ZaloPay create payment endpoint | `https://sb-openapi.zalopay.vn/v2/create` |
| `ZALOPAY_ENDPOINT_QUERY` | ZaloPay query payment endpoint | `https://sb-openapi.zalopay.vn/v2/query` |

### Database configuration

Configure your MongoDB Atlas connection in the `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop_ease?retryWrites=true&w=majority
```

### Payment gateway setup

Configure ZaloPay and MoMo for payment processing:

```env
# ZaloPay Configuration
ZALOPAY_APP_ID=your_zalopay_app_id
ZALOPAY_KEY1=your_zalopay_key1
ZALOPAY_KEY2=your_zalopay_key2

# MoMo Configuration
MOMO_PARTNER_CODE=your_momo_partner_code
MOMO_ACCESS_KEY=your_momo_access_key
MOMO_SECRET_KEY=your_momo_secret_key
```

<a name="development"></a>

## Development

### Project structure

```
root/
├── client/ (store)
├── admin/ (store-admin)
├── server/ (store-api)
├── docs/
└── README.md
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

<a name="deployment"></a>

## Deployment

### Frontend deployment with Vercel

1. **Connect your repository to Vercel:**
   - Visit [vercel.com](https://vercel.com) and sign up/login
   - Click "New Project" and import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

2. **Configure environment variables:**
   ```env
    # Application Configuration
    APP_PORT=3000
    NODE_ENV=production
    URL_CLIENT_DEPLOY=https://your-client-app.vercel.app
    URL_ADMIN_DEPLOY=https://your-admin-app.vercel.app
    URL_API_DEPLOY=https://your-api-app.render.com

    # Database
    MONGO_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/laptop_ease?retryWrites=true&w=majority

    # JWT Configuration
    JWT_ACCESS_TOKEN=your_jwt_access_token_secret
    JWT_REFRESH_TOKEN=your_jwt_refresh_token_secret
    JWT_ACCOUNT_VERIFY=your_jwt_account_verify_secret

    # OAuth Configuration
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FACEBOOK_APP_SECRET=your_facebook_app_secret

    # Email Configuration
    NAME=smtp.gmail.com
    HOST=smtp.gmail.com
    SERVICE=gmail
    USER=your_email@gmail.com
    PASS=your_app_password

    # Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    CLOUDINARY_API_ENV=your_cloudinary_env_variable

    # Payment Gateway Configuration
    ACCESS_KEY_MOMO=F8BBA842ECF85
    SECRET_KEY_MOMO=K951B6PE1waDMi640xX08PD3vg6EkVlz
    PARTNER_CODE_MOMO=MOMO
    IPN_URL_MOMO_NGROK=https://your-api-app.render.com/api/payment/momo/callback

    ZALOPAY_APP_ID=2554
    ZALOPAY_KEY1=sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn
    ZALOPAY_KEY2=trMrHtvjo6myautxDUiAcYsVtaeQ8nhf
    ZALOPAY_ENDPOINT_CREATE=https://sb-openapi.zalopay.vn/v2/create
    ZALOPAY_ENDPOINT_QUERY=https://sb-openapi.zalopay.vn/v2/query
   ```

3. **Deploy:**
   - Click "Deploy" and Vercel will automatically build and deploy your application
   - Your app will be available at `https://your-app-name.vercel.app`

### Backend deployment with Render

If you have a separate backend API:

1. **Create a new Web Service on Render:**
   - Visit [render.com](https://render.com) and sign up/login
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository

2. **Configure build and start commands:**
   ```bash
   # Build Command
   npm install && npm run build
   
   # Start Command
   npm start
   ```

3. **Set environment variables:**
   - Add all the environment variables listed above in the Render dashboard
   - Make sure to update `NEXTAUTH_URL` to your Render service URL

### Database setup with MongoDB Atlas

1. **Create MongoDB Atlas cluster:**
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a new project and cluster
   - Choose the free tier for development

2. **Configure database access:**
   - Create a database user with read/write permissions
   - Add your IP address to the IP Access List (or use 0.0.0.0/0 for all IPs in production)

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string and replace `<password>` with your database user password

4. **Set up collections:**
   ```javascript
   // The application will automatically create collections when needed
   // Main collections: users, products, versions, orders, categories, subcategories
   ```

### Environment-specific configurations

- **Development**: 
  - Use local MongoDB or MongoDB Atlas free tier
  - Hot reloading enabled
  - Detailed error messages

- **Production**: 
  - MongoDB Atlas production cluster
  - Optimized builds
  - Error logging and monitoring
  - Environment variables secured

<a name="todo"></a>

## TODO

- [x] Product catalog with search and filtering
- [x] User authentication and profiles
- [x] Shopping cart and checkout process
- [x] Payment integration with ZaloPay, MoMo (for Vietnamese market)
- [x] Admin dashboard for inventory management
- [x] MongoDB Atlas integration
- [x] Deployment on Vercel and Render
- [ ] Advanced recommendation system
  - [ ] AI-powered product recommendations
  - [ ] Collaborative filtering based on user behavior
- [ ] Enhanced features
  - [ ] Live chat customer support
  - [ ] Product availability notifications
  - [ ] Price drop alerts
  - [ ] Bulk order discounts
- [ ] Mobile application
  - [ ] React Native mobile app
  - [ ] Push notifications
- [ ] Analytics and reporting
  - [ ] Advanced sales analytics
  - [ ] Customer behavior tracking
  - [ ] Inventory forecasting
- [ ] Internationalization
  - [ ] Multi-language support
  - [ ] Multi-currency support
  - [ ] Regional shipping options
- [ ] Performance optimizations
  - [ ] Image optimization and CDN
  - [ ] Database query optimization
  - [ ] Caching strategies with Redis

<a name="license"></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

**Laptop Ease** - Making laptop shopping easier, one click at a time.