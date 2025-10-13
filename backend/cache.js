const searchHistory = new Map();
const favorites = [];
let favoritesIdCounter = 1;

export const cache = {
  searchHistory: {
    get: (query) => {
      const results = [];
      for (const [key, value] of searchHistory.entries()) {
        if (key.toLowerCase().includes(query.toLowerCase()) ||
            value.cityName.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            city_name: value.cityName,
            region: value.region,
            country: value.country,
            latitude: value.latitude,
            longitude: value.longitude,
            search_count: value.searchCount
          });
        }
      }
      return results.sort((a, b) => b.search_count - a.search_count).slice(0, 5);
    },

    save: (query, cityName, region, country, latitude, longitude) => {
      if (searchHistory.has(query)) {
        const existing = searchHistory.get(query);
        existing.searchCount++;
        existing.lastSearched = Date.now();
      } else {
        searchHistory.set(query, {
          query,
          cityName,
          region,
          country,
          latitude,
          longitude,
          searchCount: 1,
          lastSearched: Date.now()
        });
      }
    }
  },

  favorites: {
    getAll: () => {
      return favorites.map(f => ({
        id: f.id,
        city_name: f.cityName,
        region: f.region,
        country: f.country,
        latitude: f.latitude,
        longitude: f.longitude,
        created_at: f.createdAt
      }));
    },

    add: (cityName, region, country, latitude, longitude) => {
      const favorite = {
        id: favoritesIdCounter++,
        cityName,
        region,
        country,
        latitude,
        longitude,
        createdAt: new Date().toISOString()
      };
      favorites.push(favorite);
      return favorite.id;
    },

    delete: (id) => {
      const index = favorites.findIndex(f => f.id === parseInt(id));
      if (index !== -1) {
        favorites.splice(index, 1);
        return true;
      }
      return false;
    }
  }
};
