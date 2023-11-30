# Project Documentation

## Backend - Django

### Technical Decisions

#### Django as the Backend Framework

For the backend of this project, we chose Django due to its robustness, ease of use, and built-in features for web development. Django provides a powerful and secure environment for handling HTTP requests, making it well-suited for building the server-side logic of our map application.

#### Parsing CSV File

In the `views.py` file, we implemented a `parse_csv_file` function responsible for reading a CSV file and returning its contents as a list. This function ensures that our backend can dynamically load and process data from a CSV file.

#### Finding Trucks Based on Location

The `find_trucks` function takes the parsed CSV data, user location, and a specified number as parameters. It calculates the squared distances between each data point and the user's location, filters rows with 'Truck' in the 3rd field, and returns the top 'number' rows. This logic enables us to efficiently retrieve relevant food truck data based on the user's location.

#### REST API Endpoint - `truck_view`

The `truck_view` function is the API endpoint responsible for handling GET requests. It extracts the user's location from query parameters, parses the CSV file, and uses the `find_trucks` function to retrieve and return relevant food truck data as a JSON response.

### Trade-offs

#### Handling CSV File Errors

To simplify error handling, we made a trade-off by returning `None` for both file not found and CSV format errors in the `parse_csv_file` function. This decision aims to provide a unified error response in case of issues related to the CSV file.

### Considerations

#### AllowAny Permission

We utilized the `AllowAny` permission class for the `truck_view` API endpoint, allowing unrestricted access. Depending on project requirements, consider adjusting permissions to enhance security.

## Frontend - React

### Technical Decisions

#### React as the Frontend Framework

We chose React for the frontend framework due to its declarative and component-based nature, making it highly modular and easy to maintain. React's virtual DOM ensures efficient updates, contributing to a smooth and responsive user interface.

#### Google Map React Library

For mapping functionality, we utilized the Google Map React library. This library simplifies the integration of Google Maps into React applications and provides a convenient interface for managing maps and markers.

### Frontend - `MapContainer.js`

#### Dynamic Marker Rendering

The `MapContainer.js` file encapsulates the functionality for rendering an interactive map with dynamic markers. It leverages the `GoogleMapReact` component to display the map and handles the placement of markers based on the provided data.

#### Marker Interaction

The component supports user interaction by responding to map clicks. It clears existing markers, adds a new marker at the clicked position with a distinctive blue icon, and triggers the `onPositionClick` callback with the selected position.

#### Dynamic Marker Positioning

The `positionMarkers` function efficiently positions markers on the map by iterating over the provided marker data. The `clearMarkers` function ensures a clean slate before adding new markers.

### Considerations

#### Marker Icon Customization

We chose a blue marker icon for newly added markers to distinguish them from existing markers. This choice ensures a clear visual indication of user-selected positions.

#### Map Styling and Dimensions

The map container is styled with a height of 700px and a width of 70%, providing a visually appealing and responsive map display. Consider adjusting these dimensions based on specific design requirements.

### Rationale

#### Memoization for Map Component

To optimize performance, we utilize the `useMemo` hook to memoize the `GoogleMapReact` component. This ensures that the component is only re-rendered when the `list` prop changes, preventing unnecessary re-rendering.

#### Real-time Marker Updates

The `useEffect` hook responds to changes in the `list` prop, updating markers dynamically when new data is received. This feature supports real-time updates and keeps the map synchronized with the backend.

#### Future Improvements

Given more time, we would explore additional features such as clustering for markers to improve performance when dealing with a large number of data points. Additionally, providing user customization options for marker appearance could enhance the overall user experience.


