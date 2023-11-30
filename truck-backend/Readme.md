# Food Truck Finder Server

This Django server provides an API endpoint to find food trucks based on the user's location.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoint](#api-endpoint)
  - [Parameters](#parameters)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Python 3.x
- Django
- NumPy

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/food-truck-finder-server.git

2. Install dependencies:

    ```bash
    pip install -r requirements.txt

3. Run the Django server:

    ```bash
    python manage.py runserver

### Usage

1. API Endpoint

    GET /truck/
    Find food trucks based on the user's location.

2. Parameters

    lat (required): Latitude of the user's location.
    lng (required): Longitude of the user's location.

### Contributing

1. Fork the repository.
2. Create a new branch for your feature: git checkout -b feature-name.
3. Commit your changes: git commit -m 'Add new feature'.
4. Push to the branch: git push origin feature-name.
5. Open a pull request.

### License

This project is licensed under the MIT License.