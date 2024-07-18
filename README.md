# FashionHub

FashionHub is an e-commerce platform where users can browse, filter, and purchase products. The project includes features such as category-based browsing, price filtering, and a checkout process.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository**
    ```bash
    git clone https://github.com/AnonimiRML/E-commerce-Frontend.git
    ```

2. **Navigate to the project directory**
    ```bash
    cd fashionhub
    ```

3. **Install the dependencies**
    ```bash
    npm install
    ```

4. **Create a `.env` file in the root directory with the following variables: You can check out the API server repository for more details: [API Server Repository](https://github.com/AnonimiRML/E-commerce)**
    ```env
    REACT_APP_API_URL=http://localhost:5000/api/v1
    ```

5. **Run the application**
    ```bash
    npm start
    ```

## Usage

- **Home Page:** The home page displays a banner and a list of categories. Clicking on a category button navigates to the products page with the category filter applied.
- **Products Page:** Users can filter products by category, minimum price, and maximum price.
- **Checkout Page:** Users can enter shipping information, review their order, and submit payment details.

## API Endpoints

The API server is built using Node.js. You can check out the API server repository for more details: [API Server Repository](https://github.com/AnonimiRML/E-commerce)

## Environment Variables

The following environment variables are required to run this project:

- `REACT_APP_API_URL`: The base URL for the API.

## Features

- **Category Filtering:** Filter products by categories.
- **Price Filtering:** Filter products by price range.
- **Add to Cart:** Add products to the shopping cart.
- **Checkout:** Complete the purchase by entering shipping and payment details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any feature enhancements, bug fixes, or other improvements.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
