# RYM Link for Spicetify

A Spicetify extension that adds context menu options to open any Spotify artist on RateYourMusic.

## Features

- Adds two RateYourMusic options to the artist context menu:
  - **"Open on RateYourMusic"** - Attempts to navigate directly to the artist's page
  - **"Search on RateYourMusic"** - Falls back to RYM's search functionality
- Intelligently creates artist page URLs by slugifying artist names
- Opens the results in a new browser tab
- Shows notification when action is performed

## Installation

### Install with Marketplace

If you're using the Spicetify Marketplace, you can install this extension directly:

1. Open Spotify
2. Click on the Marketplace icon in the top bar
3. Go to the Extensions tab
4. Search for "RYM Link"
5. Click Install

### Manual Installation

Copy `rym-link.js` to your Spicetify extensions directory:
- Windows: `%appdata%\spicetify\Extensions\`
- MacOS: `~/.config/spicetify/Extensions/`
- Linux: `~/.config/spicetify/Extensions/`

Then run:
```
spicetify config extensions rym-link.js
spicetify apply
```

## Usage

1. Right-click on any artist in Spotify
2. You'll see two options:
   - **"Open on RateYourMusic"** - Use this for a direct link to the artist's page
   - **"Search on RateYourMusic"** - Use this if the direct link doesn't find the right artist
3. A new browser tab will open with either:
   - The artist's RateYourMusic page (if the direct link works)
   - RateYourMusic search results for that artist (when using the search option)

### How Direct Linking Works

The extension creates a slugified version of the artist name to generate a URL in this format:
```
https://rateyourmusic.com/artist/artist-name-slugified
```

This works very well for most artists, but might not work perfectly for:
- Artists with non-Latin characters
- Artists with unusual punctuation
- Artists whose RYM page uses a different naming convention

In these cases, use the "Search on RateYourMusic" option instead.

## Screenshots

![Screenshot of context menu with RYM Link option](preview.png)

## License

MIT