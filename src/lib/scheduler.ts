import cron from 'node-cron';
import { getUrlsFromCsv, saveUrlsToCsv } from './csvService';
import { checkUrlIndexStatus } from './urlChecker';
import { UrlRecord } from './types';

const SCHEDULE = '0 9 * * *'; // Runs at 9:00 AM every day

let isScheduled = false;

export const initScheduler = () => {
    if (isScheduled) return;

    console.log(`[Scheduler] Initializing daily check at 9:00 AM IST...`);

    cron.schedule(SCHEDULE, async () => {
        console.log(`[Scheduler] Starting scheduled check at ${new Date().toISOString()}`);
        await runFullCheck();
        console.log(`[Scheduler] Scheduled check completed at ${new Date().toISOString()}`);
    }, {
        timezone: "Asia/Kolkata"
    });

    isScheduled = true;
};

export const runFullCheck = async (): Promise<UrlRecord[]> => {
    console.log('[Check] Starting full indexation check...');
    const currentUrls = await getUrlsFromCsv();
    const updatedRecords: UrlRecord[] = [];

    // For 30 URLs, Promise.all is fine.

    const checkPromises = currentUrls.map(async (record) => {
        try {
            const result = await checkUrlIndexStatus(record.url);

            // Update record
            return {
                ...record,
                status: result.status,
                notes: result.notes,
                lastChecked: new Date().toISOString(), // Store as ISO
            };
        } catch (e) {
            return {
                ...record,
                status: 'Invalid',
                notes: 'System error during check',
                lastChecked: new Date().toISOString(),
            };
        }
    });

    const results = await Promise.all(checkPromises);

    // Save back to CSV
    await saveUrlsToCsv(results);
    console.log('[Check] Full check completed and saved.');

    return results;
};
