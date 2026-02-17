import React from 'react';
import { UrlRecord } from '@/lib/types';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { TableCell } from '@/components/atoms/TableCell';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface UrlRowProps {
  record: UrlRecord;
  index: number;
}

export const UrlRow: React.FC<UrlRowProps> = ({ record, index }) => {
  return (
    <tr className="hover">
      <TableCell className="font-mono text-xs">{index + 1}</TableCell>
      <TableCell>
        <a 
          href={record.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link link-hover text-sm"
        >
          {record.url}
        </a>
      </TableCell>
      <TableCell>
        <StatusBadge status={record.status} />
      </TableCell>
      <TableCell>
        <span className="text-gray-500" title={record.lastChecked}>
          {dayjs(record.lastChecked).format('DD MMM YYYY, hh:mm A')}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-gray-500 italic text-xs truncate max-w-xs block">
          {record.notes}
        </span>
      </TableCell>
    </tr>
  );
};
