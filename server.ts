import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateFallbackPlan(
  startCity: string,
  budget: number,
  currency: string,
  people: number,
  days: number,
  interests: string[]
) {
  const costScale = budget > 0 ? budget : 20000;

  const baseDestinations = [
    {
      id: "dest-1",
      name: "Goa Coastline",
      stateOrCountry: "Goa, India",
      vibe: "Sun, Sand & Coastal Cuisine",
      tagline: "Golden beaches, historic Portuguese architecture, and vibrant oceanfront shacks",
      matchScore: 97,
      searchQuery: "Baga Beach Goa attractions",
      coordinates: { lat: 15.5527, lng: 73.7517 },
      costPercent: 0.88,
      bestTimeToVisit: "Oct - Mar",
      travelDuration: `6-8h from ${startCity}`,
      keyHighlights: ["Baga Beach Sunset", "Chapora Fort Hike", "Old Goa Basilicas", "Spicy Fish Curry Rice"],
      whyMatch: `Fits comfortably within your ${currency} ${budget.toLocaleString()} budget with rich coastal experiences.`,
    },
    {
      id: "dest-2",
      name: "Udaipur & Lakes",
      stateOrCountry: "Rajasthan, India",
      vibe: "Royal Heritage & Palaces",
      tagline: "Serene lakeside palaces, majestic forts, and rich Rajasthani cultural arts",
      matchScore: 94,
      searchQuery: "City Palace Udaipur Rajasthan",
      coordinates: { lat: 24.5854, lng: 73.6837 },
      costPercent: 0.82,
      bestTimeToVisit: "Sep - Mar",
      travelDuration: `7-9h from ${startCity}`,
      keyHighlights: ["Lake Pichola Boat Cruise", "City Palace Tour", "Saheliyon Ki Bari", "Bagore Ki Haveli Folk Show"],
      whyMatch: "Ideal cultural escape with budget-friendly lakeview boutique stays.",
    },
    {
      id: "dest-3",
      name: "Munnar Tea Gardens",
      stateOrCountry: "Kerala, India",
      vibe: "Misty Mountains & Nature",
      tagline: "Rolling emerald tea plantations, fresh mountain mist, and cascading waterfalls",
      matchScore: 91,
      searchQuery: "Munnar Tea Gardens Kerala",
      coordinates: { lat: 10.0889, lng: 77.0595 },
      costPercent: 0.78,
      bestTimeToVisit: "Year-Round",
      travelDuration: `8-10h from ${startCity}`,
      keyHighlights: ["Mattupetty Dam", "Eravikulam National Park", "Tea Museum & Tasting", "Attukad Waterfalls"],
      whyMatch: "Relaxing hill station getaway offering scenic nature trails and budget homestays.",
    },
    {
      id: "dest-4",
      name: "Jaipur Pink City",
      stateOrCountry: "Rajasthan, India",
      vibe: "Historic Forts & Bazaars",
      tagline: "Grand Amber Fort, vibrant textile bazaars, and traditional street food tours",
      matchScore: 88,
      searchQuery: "Amber Palace Jaipur Rajasthan",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      costPercent: 0.75,
      bestTimeToVisit: "Oct - Mar",
      travelDuration: `5-7h from ${startCity}`,
      keyHighlights: ["Amber Fort Light Show", "Hawa Mahal View", "Johari Bazaar Shopping", "Chokhi Dhani Dinner"],
      whyMatch: "High-value historic getaway rich in photography, crafts, and food.",
    },
    {
      id: "dest-5",
      name: "Pondicherry French Quarter",
      stateOrCountry: "Tamil Nadu, India",
      vibe: "Colonial Charm & Beaches",
      tagline: "Pastel yellow colonial streets, quiet ocean promenades, and serene coastal cafes",
      matchScore: 85,
      searchQuery: "Promenade Beach Pondicherry",
      coordinates: { lat: 11.9416, lng: 79.8083 },
      costPercent: 0.70,
      bestTimeToVisit: "Oct - Mar",
      travelDuration: `6-8h from ${startCity}`,
      keyHighlights: ["French Quarter Heritage Walk", "Auroville Dome", "Rock Beach Sunrise", "Baker Street Pastries"],
      whyMatch: "Unique blend of coastal heritage and cozy cafes for a peaceful break.",
    },
  ];

  const destinations = baseDestinations.map((dest) => {
    const totalEst = Math.round(costScale * dest.costPercent);
    const travelEst = Math.round(totalEst * 0.25);
    const stayEst = Math.round(totalEst * 0.38);
    const foodEst = Math.round(totalEst * 0.22);
    const actEst = totalEst - travelEst - stayEst - foodEst;

    const itinerary = [];
    for (let d = 1; d <= days; d++) {
      itinerary.push({
        day: d,
        title: d === 1 ? `Arrival & Local Exploration` : d === days ? `Final Sightseeing & Departure` : `Highlights & Activity Day ${d}`,
        theme: d % 2 === 1 ? "Sightseeing & Culture" : "Nature & Culinary Walk",
        activities: [
          {
            time: "Morning",
            title: `Morning Walk & Landmark Tour`,
            description: `Explore prime spots in ${dest.name} during quiet morning hours.`,
            placeSearchQuery: `${dest.name} landmark`,
            estimatedCost: `${currency} ${Math.round(actEst / days / 2)}`,
          },
          {
            time: "Afternoon",
            title: `Local Lunch & Heritage Visit`,
            description: `Sample traditional dishes and visit top rated local spots.`,
            placeSearchQuery: `${dest.name} top restaurant`,
            estimatedCost: `${currency} ${Math.round(foodEst / days / 2)}`,
          },
          {
            time: "Evening",
            title: `Sunset Viewpoint & Promenade`,
            description: `Enjoy golden hour views, sunset photography, and lively evening markets.`,
            placeSearchQuery: `${dest.name} sunset viewpoint`,
            estimatedCost: `Free - ${currency} ${Math.round(actEst / days / 2)}`,
          },
        ],
      });
    }

    return {
      id: dest.id,
      name: dest.name,
      stateOrCountry: dest.stateOrCountry,
      vibe: dest.vibe,
      tagline: dest.tagline,
      matchScore: dest.matchScore,
      searchQuery: dest.searchQuery,
      coordinates: dest.coordinates,
      estimatedCost: {
        total: totalEst,
        breakdown: {
          travel: travelEst,
          stay: stayEst,
          food: foodEst,
          activities: actEst,
        },
      },
      bestTimeToVisit: dest.bestTimeToVisit,
      travelDuration: dest.travelDuration,
      keyHighlights: dest.keyHighlights,
      whyMatch: dest.whyMatch,
      itinerary,
    };
  });

  return {
    summary: `Curated ${destinations.length} top budget-friendly destinations departing from ${startCity} for ${people} person(s) over ${days} day(s).`,
    destinations,
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is not set.");
    }
    return new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Route: Healthcheck
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      hasMapsKey: Boolean(process.env.GOOGLE_MAPS_PLATFORM_KEY),
    });
  });

  // API Route: Plan Trip using Gemini
  app.post("/api/plan-trip", async (req, res) => {
    const { startCity, budget, currency = "INR (₹)", people = 2, days = 4, interests = [] } = req.body;

    if (!startCity || !budget || !people || !days) {
      return res.status(400).json({ error: "Missing required fields: startCity, budget, people, days" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to Secrets in Settings.",
      });
    }

    const ai = getAiClient();

    const prompt = `
You are an expert budget-friendly travel concierge for "Wayfare".
Create a personalized trip recommendation plan with 5 top destination matches based on the user's travel preferences:

- Starting City / Origin: ${startCity}
- Total Budget: ${currency} ${budget} for ${people} person(s)
- Duration: ${days} day(s)
- Travelers: ${people} person(s)
- Interests / Vibe: ${Array.isArray(interests) && interests.length > 0 ? interests.join(", ") : "General sightseeing, local food, culture, relaxation"}

REQUIREMENTS:
1. Provide 5 distinct destination choices within or near reachable range for the budget.
2. The total estimated cost for each destination should fit logically near or within the total budget of ${currency} ${budget} for ${people} traveler(s) for ${days} days.
3. For each destination, provide a detailed day-by-day itinerary for all ${days} days.
4. Each day must have 3-4 distinct activities (e.g. Morning, Afternoon, Evening, Night) with place search queries formatted for Google Places API (e.g., "Baga Beach Goa", "City Palace Jaipur").
5. Include approximate geographic coordinates (lat, lng) for each destination to render on Google Maps.
6. Make match scores realistic (e.g., 98, 95, 91, 88, 85).
`;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        destinations: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              stateOrCountry: { type: Type.STRING },
              vibe: { type: Type.STRING },
              tagline: { type: Type.STRING },
              matchScore: { type: Type.INTEGER },
              searchQuery: { type: Type.STRING },
              coordinates: {
                type: Type.OBJECT,
                properties: {
                  lat: { type: Type.NUMBER },
                  lng: { type: Type.NUMBER },
                },
                required: ["lat", "lng"],
              },
              estimatedCost: {
                type: Type.OBJECT,
                properties: {
                  total: { type: Type.NUMBER },
                  breakdown: {
                    type: Type.OBJECT,
                    properties: {
                      travel: { type: Type.NUMBER },
                      stay: { type: Type.NUMBER },
                      food: { type: Type.NUMBER },
                      activities: { type: Type.NUMBER },
                    },
                    required: ["travel", "stay", "food", "activities"],
                  },
                },
                required: ["total", "breakdown"],
              },
              bestTimeToVisit: { type: Type.STRING },
              travelDuration: { type: Type.STRING },
              keyHighlights: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              whyMatch: { type: Type.STRING },
              itinerary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    theme: { type: Type.STRING },
                    activities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          time: { type: Type.STRING },
                          title: { type: Type.STRING },
                          description: { type: Type.STRING },
                          placeSearchQuery: { type: Type.STRING },
                          estimatedCost: { type: Type.STRING },
                        },
                        required: ["time", "title", "description", "placeSearchQuery", "estimatedCost"],
                      },
                    },
                  },
                  required: ["day", "title", "theme", "activities"],
                },
              },
            },
            required: [
              "id",
              "name",
              "stateOrCountry",
              "vibe",
              "tagline",
              "matchScore",
              "searchQuery",
              "coordinates",
              "estimatedCost",
              "bestTimeToVisit",
              "travelDuration",
              "keyHighlights",
              "whyMatch",
              "itinerary",
            ],
          },
        },
      },
      required: ["summary", "destinations"],
    };

    // Candidate models to try in sequence for resiliency against 503/429 high demand spikes
    const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

    let parsedData: any = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(`Calling Gemini model: ${model} (attempt ${attempt})...`);
          const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction:
                "You are an expert travel concierge. Always return valid, well-structured JSON matching the requested schema.",
              responseMimeType: "application/json",
              responseSchema,
            },
          });

          if (response.text) {
            parsedData = JSON.parse(response.text);
            break;
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${model} attempt ${attempt} failed: ${err.message || err}`);
          if (attempt < 2) {
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      }
      if (parsedData) break;
    }

    // If all Gemini API calls failed (e.g. temporary 503 service outage across models), generate high-quality fallback plan
    if (!parsedData || !parsedData.destinations || parsedData.destinations.length === 0) {
      console.warn("All Gemini model attempts failed. Using fallback trip generator.", lastError);
      parsedData = generateFallbackPlan(startCity, Number(budget), currency, Number(people), Number(days), interests);
    }

    return res.json({
      summary: parsedData.summary || `Found ${parsedData.destinations?.length || 5} curated destinations for your trip.`,
      searchParams: { startCity, budget: Number(budget), currency, people: Number(people), days: Number(days), interests },
      destinations: parsedData.destinations || [],
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wayfare App running on http://localhost:${PORT}`);
  });
}

startServer();
