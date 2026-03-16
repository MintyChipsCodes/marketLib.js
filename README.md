# marketLib.js

A simple, lightweight library for fetching and displaying app marketplace data.

## Features

- Fetch app data from URLs or use local data objects
- Automatically renders app cards with consistent styling
- Zero dependencies
- Simple API - just one function

## Installation

Include the script in your HTML:
```html
<script src="marketLib.js"></script>
```

## Usage

### Basic Setup

Create a container element in your HTML:
```html
<div class="apps"></div>
```

### Fetch from URL
```javascript
// Fetch from a URL
mpFetch('example.com/apps.json');

// Or with full URL
mpFetch('https://example.com/apps.json');
```

### Use Local Data
```javascript
var data = {
    "apps": {
        "app1": {
            "Name": "My Awesome App",
            "about": "A cool app that does amazing things",
            "creator": "John Doe",
            "download": "https://example.com/download"
        },
        "app2": {
            "Name": "Another App",
            "about": "This one is even better",
            "creator": "Jane Smith",
            "download": "https://example.com/app2"
        }
    }
};

mpFetch(data);
```

### Custom Container

By default, `mpFetch` looks for a `.apps` container. You can specify a different selector:
```javascript
mpFetch('example.com/apps.json', '#my-custom-container');
```

## Data Format

Your JSON data should follow this structure:
```json
{
    "apps": {
        "unique-app-id": {
            "Name": "App Name",
            "about": "Short description",
            "creator": "Creator name",
            "download": "https://download-url.com"
        }
    }
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `Name` | string | Yes | Display name of the app |
| `about` | string | No | Brief description of the app |
| `creator` | string | No | Creator/author name |
| `download` | string | No | URL to download the app |

## API Reference

### `mpFetch(source, container)`

Fetches app data and renders app cards into the specified container.

**Parameters:**
- `source` (string | Object) - Either a URL to fetch JSON from, or a data object
- `container` (string, optional) - CSS selector for the container element. Default: `'.apps'`

**Returns:** `Promise<void>`

**Example:**
```javascript
// From URL
mpFetch('https://api.example.com/apps.json');

// From object
mpFetch(dataObject);

// Custom container
mpFetch('https://api.example.com/apps.json', '#marketplace');
```

## Styling

marketLib creates the following HTML structure:
```html
<div class="apps">
    <p>apps</p>
    <div class="app">
        <div style="font-weight: bold; margin-bottom: 8px;">App Name</div>
        <div style="font-size: 0.9em; margin-bottom: 4px;">Description</div>
        <div style="font-size: 0.9em; margin-bottom: 8px;">Creator</div>
        <a href="..." style="color: #4a9eff; text-decoration: none;" target="_blank">download</a>
    </div>
    <!-- More app cards... -->
</div>
```

You can override styles by targeting the `.app` class:
```css
.app {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 8px;
}

.app a {
    color: #ff6b35 !important;
    font-weight: bold;
}
```

## Error Handling

marketLib handles errors gracefully:

- **Container not found**: Logs error to console
- **Network errors**: Displays error message in the container
- **Invalid data**: Shows "No apps found" message

## Browser Support

Works in all modern browsers that support:
- ES6 (async/await)
- Fetch API
- Template literals

## License

MIT

## Contributing

Issues and pull requests welcome!
