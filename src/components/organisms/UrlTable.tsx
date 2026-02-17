import React from 'react';
import { UrlRecord } from '@/lib/types';
import { UrlRow } from '@/components/molecules/UrlRow';
import { Loader } from '@/components/atoms/Loader';

interface UrlTableProps {
  urls: UrlRecord[];
  isLoading: boolean;
}

export const UrlTable: React.FC<UrlTableProps> = ({ urls, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No URLs found. check data/urls.csv
      </div>
    );
  }

  return (
    <div className="overflow-x-auto   rounded-box border border-base-200 bg-base-100">
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th className="w-12">#</th>
            <th>URL</th>
            <th className="w-32">Status</th>
            <th className="w-48">Last Checked</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((record, index) => (
            <UrlRow key={`${record.url}-${index}`} record={record} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
