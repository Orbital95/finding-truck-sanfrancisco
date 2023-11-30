This is frontend project for finding food trucks in San Francisco using 'google-map-react'.

## Getting started

In the simple case you just need to add `lat` and `lng` props to any child of `GoogleMapReact` component.

### My map doesn't appear!

- Make sure the container element has width and height. The map will try to fill the parent container, but if the container has no size, the map will collapse to 0 width / height. This is not a requirement for google-map-react, [its a requirement for google-maps in general](https://developers.google.com/maps/documentation/javascript/tutorial).


## Installation

npm:
```
npm install --save google-map-react
```

yarn:
```
yarn add google-map-react
```

## Features

### Works with your Components

Instead of the default Google Maps markers, balloons and other map components, you can render your cool animated react components on the map.

### Isomorphic Rendering

It renders on the server. *(Welcome search engines)* *(you can disable javascript in browser dev tools, and reload any example page to see how it works)*

### Component Positions Calculated Independently of Google Maps API

It renders components on the map before (and even without) the Google Maps API loaded.

### Google Maps API Loads on Demand

There is no need to place a `<script src=` tag at top of page. The Google Maps API loads upon the first usage of the `GoogleMapReact` component.

### Use Google Maps API 

You can access to Google Maps `map` and `maps` objects by using `onGoogleApiLoaded`, in this case you will need to set `yesIWantToUseGoogleMapApiInternals` to `true`

```javascript
...

 const handleApiLoaded = (map, maps) => {
    mapRef.current = map;
    // Use the map instance to position markers
    positionMarkers(maps);

    // Add click event listener to the map
    mapRef.current.addListener('click', (e) => handleMapClick(e, maps));
  };

...

const map = useMemo(() => {
    return <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultCenter}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      />
            
  }, [list])
```

PST: Remember to set `yesIWantToUseGoogleMapApiInternals` to true.

[Example here](https://github.com/google-map-react/google-map-react-examples/blob/master/src/examples/Main.js#L69)


## Documentation

## Contribute

Local development is broken into two parts (ideally using two tabs).

First, run rollup to watch your `src/` module and automatically recompile it into `dist/` whenever you make changes.

```bash
npm start # runs rollup with watch flag
```

The second part will be running the `example/` create-react-app that's linked to the local version of your module.

```bash
# (in another tab)
cd example
npm start # runs create-react-app dev server
```

Now, anytime you make a change to your library in `src/` or to the example app's `example/src`, `create-react-app` will live-reload your local dev server so you can iterate on your component in real-time.

### Manual link-install
If you get the error `Module not found: Can't resolve 'google-react-map'...` while trying to run the example app, you need to manually link your local development module, try the following steps:
  1. In the root folder:
  ```bash
  npm link
  ```
  2. Go into `example/` and (after installing other dependencies) execute:
  ```bash
  npm link google-map-react
  ```

## License

[MIT](./LICENSE.md)

