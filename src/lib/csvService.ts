import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { createObjectCsvWriter } from 'csv-writer';
import { UrlRecord } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const CSV_FILE_PATH = path.join(DATA_DIR, 'urls.csv');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

export const getUrlsFromCsv = async (): Promise<UrlRecord[]> => {
    if (!fs.existsSync(CSV_FILE_PATH)) {
        return [];
    }

    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
    });

    return records.map((record: any) => ({
        url: record['URL'] || record['url'],
        status: record['Status'] || record['status'] || 'Not Indexed',
        lastChecked: record['Last Checked Date'] || record['lastChecked'] || new Date().toISOString(),
        notes: record['Notes'] || record['notes'] || '',
    }));
};

export const saveUrlsToCsv = async (records: UrlRecord[]): Promise<void> => {
    const csvWriter = createObjectCsvWriter({
        path: CSV_FILE_PATH,
        header: [
            { id: 'url', title: 'URL' },
            { id: 'status', title: 'Status' },
            { id: 'lastChecked', title: 'Last Checked Date' },
            { id: 'notes', title: 'Notes' },
        ],
    });

    await csvWriter.writeRecords(records);
};
