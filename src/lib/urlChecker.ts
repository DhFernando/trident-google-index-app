import axios from "axios";
import { CheckResult } from "./types";

 
export const checkUrlIndexStatus = async (url: string): Promise<CheckResult> => {
  try {

    console.log('hellwo')
    console.log(process.env.SERPER_API_KEY)
    // Small delay to avoid hitting rate limits (important)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return {
        status: "Invalid",
        notes: "Malformed URL",
      };
    }

    // Allow only http/https
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return {
        status: "Invalid",
        notes: "Unsupported protocol",
      };
    }

    // Call Serper API to search Google
    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: `site:${url}`, // this checks if page exists in Google index
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY as string,
          "Content-Type": "application/json",
        },
        timeout: 20000,
      }
    );

    console.log(process.env.SERPER_API_KEY)

    const organicResults = response.data?.organic || [];

    // If Google returned results → indexed
    if (organicResults.length > 0) {
      return {
        status: "Indexed",
        notes: "Found in Google index",
      };
    }

    // No results → not indexed
    return {
      status: "Not Indexed",
      notes: "Not found in Google",
    };
  } catch (error: any) {
    // API limit reached
    if (error.response?.status === 429) {
      return {
        status: "Invalid",
        notes: "API limit reached",
      };
    }

    // Network/DNS error
    if (error.code === "ENOTFOUND") {
      return {
        status: "Invalid",
        notes: "Domain not found",
      };
    }

    return {
      status: "Invalid",
      notes: "API or network error",
    };
  }
};
