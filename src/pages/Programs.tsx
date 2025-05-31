import React, { useState } from 'react';
import { Building2, Users, Home, ArrowUpRight, X, LayoutGrid, Table } from 'lucide-react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgramFilter } from '../components/programs/ProgramFilter';
import { mockClients } from '../data/mockData';

// Extract unique programs from clients
const programs = mockClients
  .filter(client => client.program)
  .map(client => client.program!)
  .filter((program, index, self) => 
    index === self.findIndex((p) => p.id === program.id)
  );

const programTypeLabels = {
  permanent: 'Permanent Housing',
  transitional: 'Transitional Housing',
  emergency: 'Emergency Shelter',
  rapid_rehousing: 'Rapid Re-housing'
};

export function Programs() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const { id } = useParams();
  const navigate = useNavigate();
  
  const filteredPrograms = programs.filter(program => {
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      if (!program.name.toLowerCase().includes(query) &&
          !program.provider.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Filter by program types
    if (filters.types && filters.types.length > 0) {
      if (!filters.types.includes(program.type)) {
        return false;
      }
    }

    // Filter by providers
    if (filters.providers && filters.providers.length > 0) {
      if (!filters.providers.includes(program.provider)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Programs</h2>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('card')}
                className={`flex items-center rounded-full p-1.5 ${
                  viewMode === 'card' ? 'bg-gray-100' : ''
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center rounded-full p-1.5 ${
                  viewMode === 'table' ? 'bg-gray-100' : ''
                }`}
              >
                <Table className="h-4 w-4" />
              </button>
            </div>
            <Button>
              <Building2 className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </div>
        </div>

        {/* Program Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Programs</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">{programs.length}</p>
                </div>
                <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <Building2 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Capacity</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {programs.reduce((sum, p) => sum + p.capacity, 0)}
                  </p>
                </div>
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Current Occupancy</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {programs.reduce((sum, p) => sum + p.currentOccupancy, 0)}
                  </p>
                </div>
                <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                  <Home className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {Math.round(
                      (programs.reduce((sum, p) => sum + p.currentOccupancy, 0) /
                      programs.reduce((sum, p) => sum + p.capacity, 0)) * 100
                    )}%
                  </p>
                </div>
                <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <ProgramFilter onFilterChange={setFilters} />

        {/* Programs List */}
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                onClick={() => navigate(`/programs/${program.id}`)}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{program.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{program.provider}</p>
                      </div>
                      <Badge variant={
                        program.type === 'permanent' ? 'success' :
                        program.type === 'transitional' ? 'info' :
                        program.type === 'emergency' ? 'warning' :
                        'secondary'
                      }>
                        {programTypeLabels[program.type]}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">{program.address}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {program.currentOccupancy} / {program.capacity}
                          </p>
                          <p className="text-xs text-gray-500">Current Occupancy</p>
                        </div>
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full ${
                              (program.currentOccupancy / program.capacity) > 0.9
                                ? 'bg-red-500'
                                : (program.currentOccupancy / program.capacity) > 0.7
                                ? 'bg-amber-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${(program.currentOccupancy / program.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Provider</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Occupancy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPrograms.map((program) => (
                  <tr
                    key={program.id}
                    onClick={() => navigate(`/programs/${program.id}`)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-gray-900">{program.name}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge variant={
                        program.type === 'permanent' ? 'success' :
                        program.type === 'transitional' ? 'info' :
                        program.type === 'emergency' ? 'warning' :
                        'secondary'
                      }>
                        {programTypeLabels[program.type]}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {program.provider}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {program.address}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-900">
                          {program.currentOccupancy} / {program.capacity}
                        </span>
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full ${
                              (program.currentOccupancy / program.capacity) > 0.9
                                ? 'bg-red-500'
                                : (program.currentOccupancy / program.capacity) > 0.7
                                ? 'bg-amber-500'
                                : 'bg-green-500'
                            }`}
                            style={{
                              width: `${(program.currentOccupancy / program.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredPrograms.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">No programs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Side Panel */}
      {id && (
        <div className="w-2/5 border-l border-gray-200 bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
            <h2 className="text-xl font-semibold">Program Details</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/programs')}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="overflow-y-auto p-6">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}