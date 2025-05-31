import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { DashboardStat } from '../../types';

interface StatCardProps {
  stat: DashboardStat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          {stat.trend && (
            <div className={`flex items-center text-xs font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {stat.trend === 'up' ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : stat.trend === 'down' ? (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              ) : null}
              {Math.abs(stat.change || 0)}%
            </div>
          )}
        </div>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          {stat.value.toLocaleString()}
        </h2>
      </CardContent>
    </Card>
  );
}