import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ResidentList } from '../components/programs/ResidentList';
import { mockClients } from '../data/mockData';
import { formatDate } from '../lib/utils';

const programTypeLabels = {
  permanent: 'Permanent Housing',
  transitional: 'Transitional Housing',
  emergency: 'Emergency Shelter',
  rapid_rehousing: 'Rapid Re-housing'
};

export function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  
  const program = mockClients
    .find(client => client.program?.id === id)?.program;
  
  const programResidents = mockClients
    .filter(client => client.program?.id === id);

  if (!program) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-medium text-gray-900">Program Not Found</h2>
          <p className="mb-4 text-gray-500">The program you're looking for doesn't exist or has been removed.</p>
          <Link to="/programs">
            <Button>Back to Programs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Program Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">{program.name}</h1>
              <Badge variant={
                program.type === 'permanent' ? 'success' :
                program.type === 'transitional' ? 'info' :
                program.type === 'emergency' ? 'warning' :
                'secondary'
              }>
                {programTypeLabels[program.type]}
              </Badge>
            </div>
            <p className="mt-1 text-gray-500">{program.provider}</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline">Edit Program</Button>
            <Button>Add Resident</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Program Information */}
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Address</h4>
                  <p className="text-gray-900">{program.address}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Provider</h4>
                  <p className="text-gray-900">{program.provider}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Program Type</h4>
                  <p className="text-gray-900">{programTypeLabels[program.type]}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total Capacity</h4>
                  <p className="text-gray-900">{program.capacity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Current Occupancy</h4>
                  <p className="text-gray-900">{program.currentOccupancy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Available Units</h4>
                  <p className="text-gray-900">{program.capacity - program.currentOccupancy}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resident List */}
          <div className="mt-6">
            <ResidentList residents={programResidents} />
          </div>
        </div>

        <div>
          {/* Occupancy Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Occupancy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={
                        (program.currentOccupancy / program.capacity) > 0.9
                          ? '#EF4444'
                          : (program.currentOccupancy / program.capacity) > 0.7
                          ? '#F59E0B'
                          : '#10B981'
                      }
                      strokeWidth="3"
                      strokeDasharray={`${(program.currentOccupancy / program.capacity) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-bold">
                      {Math.round((program.currentOccupancy / program.capacity) * 100)}%
                    </span>
                    <span className="text-sm text-gray-500">Occupied</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{program.currentOccupancy}</p>
                    <p className="text-sm text-gray-500">Current</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-gray-900">{program.capacity}</p>
                    <p className="text-sm text-gray-500">Capacity</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Average Length of Stay</p>
                  <p className="text-lg font-semibold text-gray-900">6.2 months</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Success Rate</p>
                  <p className="text-lg font-semibold text-gray-900">78%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Waitlist</p>
                  <p className="text-lg font-semibold text-gray-900">12 clients</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}