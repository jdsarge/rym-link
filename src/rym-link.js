// NAME: RYM Link
// AUTHOR: Your Name
// DESCRIPTION: Adds a context menu item to open artist on RateYourMusic

(async function RYMLink() {
  // Wait for Spicetify to be fully loaded
  while (!Spicetify?.ContextMenu || !Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Register context menu item for artists
  const openRYM = async (uris) => {
    try {
      // Get the first URI from the selection
      const uri = uris[0];
      
      // Extract the Spotify URI components
      const uriObj = Spicetify.URI.fromString(uri);
      
      if (uriObj.type === Spicetify.URI.Type.ARTIST) {
        // Get artist metadata
        const artistName = await getArtistName(uriObj.id);
        
        if (artistName) {
          // Try to generate a direct RYM artist URL first
          const rymArtistUrl = generateRYMUrl(artistName);
          
          // Open URL in browser
          window.open(rymArtistUrl, "_blank");
          Spicetify.showNotification(`Opening ${artistName} on RateYourMusic`);
        } else {
          Spicetify.showNotification("Could not retrieve artist information", true);
        }
      } else {
        Spicetify.showNotification("This option only works with artists", true);
      }
    } catch (error) {
      console.error("RYM Link error:", error);
      Spicetify.showNotification("Error opening RateYourMusic", true);
    }
  };
  
  // Create a slugified RYM URL for the artist
  function generateRYMUrl(artistName) {
    // First try direct URL creation
    // Create a slug from the artist name 
    // Remove special characters, convert to lowercase, replace spaces with hyphens
    const slug = artistName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with a single one
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
      
    // Direct URL - will redirect if not found, but still a better starting point
    return `https://rateyourmusic.com/artist/${slug}`;
  };

  // Helper function to get artist name from Spotify ID
  async function getArtistName(artistId) {
    try {
      const artist = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/artists/${artistId}`);
      return artist.name;
    } catch (error) {
      console.error("Failed to fetch artist data:", error);
      return null;
    }
  }

  // Add the direct link item to the context menu
  new Spicetify.ContextMenu.Item(
    "Open on RateYourMusic",
    openRYM,
    (uris) => {
      // Only show this option for artist URIs
      if (uris.length !== 1) return false;
      
      const uri = uris[0];
      const uriObj = Spicetify.URI.fromString(uri);
      return uriObj.type === Spicetify.URI.Type.ARTIST;
    },
    "external-link" // Icon name from Spotify's icon set
  ).register();
  
  // Add a search fallback option as well
  new Spicetify.ContextMenu.Item(
    "Search on RateYourMusic",
    async (uris) => {
      try {
        const uri = uris[0];
        const uriObj = Spicetify.URI.fromString(uri);
        
        if (uriObj.type === Spicetify.URI.Type.ARTIST) {
          const artistName = await getArtistName(uriObj.id);
          
          if (artistName) {
            // Generate RYM search URL
            const rymSearchUrl = `https://rateyourmusic.com/search?searchterm=${encodeURIComponent(artistName)}&searchtype=a`;
            
            // Open URL in browser
            window.open(rymSearchUrl, "_blank");
            Spicetify.showNotification(`Searching for ${artistName} on RateYourMusic`);
          }
        }
      } catch (error) {
        console.error("RYM Search error:", error);
        Spicetify.showNotification("Error searching on RateYourMusic", true);
      }
    },
    (uris) => {
      if (uris.length !== 1) return false;
      
      const uri = uris[0];
      const uriObj = Spicetify.URI.fromString(uri);
      return uriObj.type === Spicetify.URI.Type.ARTIST;
    },
    "search" // Icon name from Spotify's icon set
  ).register();

  console.log("RYM Link extension loaded!");
})();