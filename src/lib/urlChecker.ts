import { UrlRecord, CheckResult } from './types';

/**
 * Simulates checking if a URL is indexed by Google.
 * In a real-world scenario, this would use a SERP API or Google Search Console API.
 * For this demo, we simulate the check with random latency and logic based on the URL.
 */
export const checkUrlIndexStatus = async (url: string): Promise<CheckResult> => {
    // Simulate network delay (500ms - 1500ms)
    const delay = Math.floor(Math.random() * 1000) + 500;
    await new Promise((resolve) => setTimeout(resolve, delay));

    try {
        const urlObj = new URL(url);

        // Invalid protocol check
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            return { status: 'Invalid', notes: 'Unsupported protocol' };
        }

        // Simulation Logic:
        // 1. Known big sites are always indexed
        const knownSites = ['google.com', 'github.com', 'wikipedia.org', 'stackoverflow.com', 'reddit.com', 'microsoft.com', 'apple.com', 'amazon.com', 'linkedin.com', 'example.com'];
        if (knownSites.some(site => url.includes(site))) {
            return { status: 'Indexed', notes: 'Verified via simulation' };
        }

        // 2. Explicit "not-indexed" keywords for testing
        if (url.includes('not-indexed') || url.includes('fake') || url.includes('test') || url.includes('staging') || url.includes('dev')) {
            return { status: 'Not Indexed', notes: 'Not found in index' };
        }

        // 3. Random fallback for unknown URLs (80% chance of not indexed for random sites in this test context)
        const isIndexed = Math.random() > 0.8;
        return {
            status: isIndexed ? 'Indexed' : 'Not Indexed',
            notes: isIndexed ? 'Verified via simulation' : 'Not found in index'
        };

    } catch (error) {
        return { status: 'Invalid', notes: 'Malformed URL' };
    }
};
