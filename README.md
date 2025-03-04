# RYM Link for Spicetify

A Spicetify extension that adds context menu options to open any Spotify artist or album on RateYourMusic.

## Features

- Adds RateYourMusic integration for both artists and albums
- For artists, adds two context menu options:
  - **"Open Artist on RateYourMusic"** - Attempts to navigate directly to the artist's page
  - **"Search Artist on RateYourMusic"** - Falls back to RYM's search functionality
- For albums, adds two context menu options:
  - **"Open Album on RateYourMusic"** - Attempts to navigate directly to the album's page
  - **"Search Album on RateYourMusic"** - Falls back to RYM's search functionality
- Intelligently creates direct page URLs by slugifying artist and album names
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

### For Artists
1. Right-click on any artist in Spotify
2. You'll see two options:
   - **"Open Artist on RateYourMusic"** - Use this for a direct link to the artist's page
   - **"Search Artist on RateYourMusic"** - Use this if the direct link doesn't find the right artist
3. A new browser tab will open with either:
   - The artist's RateYourMusic page (if the direct link works)
   - RateYourMusic search results for that artist (when using the search option)

### For Albums
1. Right-click on any album in Spotify
2. You'll see two options:
   - **"Open Album on RateYourMusic"** - Use this for a direct link to the album's page
   - **"Search Album on RateYourMusic"** - Use this if the direct link doesn't find the right album
3. A new browser tab will open with either:
   - The album's RateYourMusic page (if the direct link works)
   - RateYourMusic search results for that album (when using the search option)

### How Direct Linking Works

#### Artist URLs
The extension creates a slugified version of the artist name to generate a URL in this format:
```
https://rateyourmusic.com/artist/artist-name-slugified
```

#### Album URLs
For albums, the extension combines the artist and album names to create a URL in this format:
```
https://rateyourmusic.com/release/album/artist-name-slugified/album-name-slugified/
```

This slugification works well for most artists and albums, but might not work perfectly for:
- Names with non-Latin characters
- Names with unusual punctuation
- Cases where RYM uses a different naming convention

In these cases, use the "Search" options instead.

## Screenshots

![Screenshot of context menu with RYM Link option](preview.png)

## License

MIT
