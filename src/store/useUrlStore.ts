import { create } from 'zustand';
import { UrlRecord } from '@/lib/types';
import axios from 'axios';

interface UrlState {
    urls: UrlRecord[];
    isLoading: boolean;
    isChecking: boolean;
    lastRun: string | null;
    error: string | null;

    fetchUrls: () => Promise<void>;
    runCheck: () => Promise<void>;
}

export const useUrlStore = create<UrlState>((set) => ({
    urls: [],
    isLoading: false,
    isChecking: false,
    lastRun: null,
    error: null,

    fetchUrls: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get('/api/urls');
            // Find the most recent check date to set as lastRun
            const urls: UrlRecord[] = response.data;

            let lastRun = null;
            if (urls.length > 0) {
                // Sort to find the latest date
                const dates = urls.map(u => new Date(u.lastChecked).getTime());
                lastRun = new Date(Math.max(...dates)).toISOString();
            }

            set({ urls, lastRun, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch URLs', isLoading: false });
        }
    },

    runCheck: async () => {
        set({ isChecking: true, error: null });
        try {
            const response = await axios.post('/api/run-check');
            const updatedUrls: UrlRecord[] = response.data.data;

            set({
                urls: updatedUrls,
                lastRun: new Date().toISOString(),
                isChecking: false
            });
        } catch (error) {
            set({ error: 'Failed to run index check', isChecking: false });
        }
    },
}));
