import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, Clock, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockClients, mockAssessments } from '../data/mockData';
import { formatDate } from '../lib/utils';

// Combine client and assessment data
const clientsWithAssessments = mockClients.map(client => {
  const assessment = mockAssessments.find(a => a.clientId === client.id);
  return {
    ...client,
    assessment,
    waitingTime: Math.floor(Math.random() * 180), // Mock waiting time in days
  };
}).sort((a, b) => (b.assessment?.score || 0) - (a.assessment?.score || 0));

export function CoordinatedEntry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState<'score' | 'waiting'>('score');

  // Filter and sort clients
  const filteredClients = clientsWithAssessments
    .filter(client => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchLower) ||
        client.housingStatus.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortOrder === 'score') {
        return (b.assessment?.score || 0) - (a.assessment?.score || 0);
      }
      return (b.waitingTime || 0) - (a.waitingTime || 0);
    });

  // Calculate statistics
  const totalClients = filteredClients.length;
  const highPriority = filteredClients.filter(c => (c.assessment?.score || 0) >= 15).length;
  const averageWaitTime = Math.floor(
    filteredClients.reduce((acc, curr) => acc + (curr.waitingTime || 0), 0) / totalClients
  );
  const pendingAssessments = filteredClients.filter(c => !c.assessment).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Coordinated Entry</h1>
        <Button>
          New Assessment
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total in Queue</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{totalClients}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">High Priority</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{highPriority}</p>
              </div>
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Wait Time</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{averageWaitTime} days</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Assessment</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{pendingAssessments}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 items-center space-x-2 md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search clients..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === 'score' ? 'waiting' : 'score')}
            className="flex items-center space-x-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort by {sortOrder === 'score' ? 'Priority Score' : 'Waiting Time'}</span>
          </Button>
        </div>
      </div>

      {/* Client Queue */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="overflow-hidden hover:bg-gray-50">
            <CardContent className="p-6">
              <div className="flex items-start justify-between space-x-4">
                <div className="flex items-start space-x-4">
                  <Avatar
                    src={client.profileImage}
                    alt={`${client.firstName} ${client.lastName}`}
                    size="lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </h3>
                    <div className="mt-1 flex items-center space-x-2">
                      <Badge variant={client.housingStatus}>
                        {client.housingStatus.replace('_', ' ')}
                      </Badge>
                      {client.isVeteran && (
                        <Badge variant="info">Veteran</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Waiting {client.waitingTime} days • Last updated {formatDate(client.lastUpdated)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {client.assessment ? (
                    <>
                      <div className="text-2xl font-bold text-gray-900">
                        {client.assessment.score}
                      </div>
                      <div className="text-sm text-gray-500">Priority Score</div>
                    </>
                  ) : (
                    <Badge variant="warning">Needs Assessment</Badge>
                  )}
                  <Button variant="outline" size="sm" className="mt-2">
                    View Details
                  </Button>
                </div>
              </div>
              {client.assessment && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-700">
                    {client.assessment.recommendations}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredClients.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <h3 className="text-sm font-medium text-gray-900">No clients found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}