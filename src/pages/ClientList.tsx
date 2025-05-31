import React, { useState } from 'react';
import { PlusIcon, LayoutGrid, Table, X } from 'lucide-react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ClientCard } from '../components/clients/ClientCard';
import { ClientFilter } from '../components/clients/ClientFilter';
import { Card, CardContent } from '../components/ui/Card';
import { mockClients, mockUsers } from '../data/mockData';
import { Client } from '../types';

export function ClientList() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState<'card' | 'table'>('table');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const currentUser = mockUsers[0]; // Using first mock user for demo
  const filteredClients = filterClients(mockClients, filters);

  // Calculate dashboard stats
  const myClients = mockClients.filter(client => client.caseManagerId === currentUser.id);
  const myPrograms = Array.from(new Set(myClients.map(client => client.program?.id).filter(Boolean)));
  const abodesServed = Array.from(new Set(mockClients.map(client => client.program?.id).filter(Boolean)));

  const dashboardStats = [
    {
      id: 'my-clients',
      label: 'My Clients',
      value: myClients.length,
      onClick: () => {
        if (activeFilter === 'my-clients') {
          setActiveFilter(null);
          setFilters({});
        } else {
          setActiveFilter('my-clients');
          setFilters({ ...filters, caseManagerId: currentUser.id });
        }
      },
      active: activeFilter === 'my-clients',
    },
    {
      id: 'my-programs',
      label: 'My Programs',
      value: myPrograms.length,
      onClick: () => {
        if (activeFilter === 'my-programs') {
          setActiveFilter(null);
          setFilters({});
        } else {
          setActiveFilter('my-programs');
          setFilters({ ...filters, programIds: myPrograms });
        }
      },
      active: activeFilter === 'my-programs',
    },
    {
      id: 'abodes-served',
      label: 'Abodes Served',
      value: abodesServed.length,
      onClick: () => {
        if (activeFilter === 'abodes-served') {
          setActiveFilter(null);
          setFilters({});
        } else {
          setActiveFilter('abodes-served');
          setFilters({ ...filters, programIds: abodesServed });
        }
      },
      active: activeFilter === 'abodes-served',
    },
    {
      id: 'all',
      label: 'All',
      value: mockClients.length,
      onClick: () => {
        if (activeFilter === 'all') {
          setActiveFilter(null);
          setFilters({});
        } else {
          setActiveFilter('all');
          setFilters({});
        }
      },
      active: activeFilter === 'all',
    },
  ];

  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 space-y-6 overflow-y-auto p-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat) => (
            <Card 
              key={stat.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                stat.active ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={stat.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <ClientFilter onFilterChange={setFilters} />

        <div className="flex items-center justify-between">
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
          <Button className="flex items-center gap-1">
            <PlusIcon className="h-4 w-4" /> Add Client
          </Button>
        </div>
        
        {viewMode === 'card' ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredClients.map(client => (
              <div
                key={client.id}
                onClick={() => navigate(`/clients/${client.id}`)}
                className="cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <ClientCard client={client} />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Priority Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredClients.map(client => (
                  <tr
                    key={client.id}
                    onClick={() => navigate(`/clients/${client.id}`)}
                    className="cursor-pointer transition-colors hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 flex-shrink-0 rounded-full"
                          src={client.profileImage}
                          alt=""
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {client.firstName} {client.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {client.program?.name || 'Not Assigned'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        client.housingStatus === 'housed' ? 'bg-green-100 text-green-800' :
                        client.housingStatus === 'homeless' ? 'bg-red-100 text-red-800' :
                        client.housingStatus === 'at_risk' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {client.housingStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {client.priorityScore}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(client.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {filteredClients.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">No clients found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Side Panel */}
      {id && (
        <div className="w-2/5 border-l border-gray-200 bg-white">
          <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
            <h2 className="text-xl font-semibold">Client Details</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/clients')}
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

function filterClients(clients: Client[], filters: any): Client[] {
  return clients.filter(client => {
    // Filter by case manager
    if (filters.caseManagerId && client.caseManagerId !== filters.caseManagerId) {
      return false;
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      const programName = client.program?.name.toLowerCase() || '';
      
      if (!fullName.includes(query) && !programName.includes(query)) {
        return false;
      }
    }
    
    // Filter by housing status
    if (filters.housingStatus && filters.housingStatus.length > 0) {
      if (!filters.housingStatus.includes(client.housingStatus)) {
        return false;
      }
    }

    // Filter by program
    if (filters.programIds && filters.programIds.length > 0) {
      if (!client.program || !filters.programIds.includes(client.program.id)) {
        return false;
      }
    }
    
    return true;
  });
}