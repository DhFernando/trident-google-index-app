# URL Indexation Checker Dashboard

A full-stack Next.js application to monitor Google Index status for a list of URLs.
Features a responsive single-page dashboard, automated daily checks, and manual trigger capabilities.

## Tech Stack
- **Framework**: Next.js 14+
- **Language**: TypeScript 
- **Styling**:  TailwindCSS  +  DaisyUI 
- **State Management**:  Zustand 
- **Backend Utilities**:
  - `node-cron`: For scheduling daily checks.
  - `csv-parse` / `csv-writer`: For reading/writing local data.
  - `dayjs`: For date handling.

## Getting Started

### Prerequisites
- Node.js 18+ installed.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the development server:
```bash
npm run dev
```
Open http://localhost:3000  in your browser.

## Features & Usage


### 1. Automated Schedule
The application includes a scheduler initialized on server start.
- **Default Schedule**: Daily at **9:00 AM IST**.
- **Configuration**:
  - Modify `src/lib/scheduler.ts` to change the Cron expression.
  - Current: `0 9 * * *` (9:00 AM) with timezone `Asia/Kolkata`.

### 2. Data Management
- URLs are stored in `data/urls.csv`.
- You can manually edit this file to add/remove URLs.
- Ensure the CSV header matches: `URL,Status,Last Checked Date,Notes`.

## Implementation Details

### Index Checking Logic (`src/lib/urlChecker.ts`)
Currently, the check is **simulated** for demonstration purposes:
- Known major sites (Google, GitHub, etc.) return **Indexed**.
- URLs containing "not-indexed", "fake", etc., return **Not Indexed**.
- Random fallback logic is applied for other URLs.
- **Note**: For real-world usage, integrate with Google Search Console API or a SERP scraping service here.
 

## Architecture
- **Frontend**: Client-side React components using Zustand for global state.
- **Backend**: Next.js API Routes (`/api/urls`, `/api/run-check`) handle data persistence and logic.
