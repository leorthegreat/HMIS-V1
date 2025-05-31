import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, Users, Building2, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockServices, mockProviders } from '../data/mockData';
import { formatDate } from '../lib/utils';

// Group services by category
const serviceCategories = {
  housing: 'Housing Assistance',
  health: 'Healthcare',
  employment: 'Employment & Training',
  financial: 'Financial Support',
  legal: 'Legal Services',
  education: 'Education',
  transportation: 'Transportation',
  food: 'Food & Nutrition',
};

export function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Calculate statistics
  const activeServices = mockServices.filter(s => s.status === 'in_progress').length;
  const totalProviders = mockProviders.length;
  const scheduledServices = mockServices.filter(s => s.status === 'scheduled').length;
  const completedServices = mockServices.filter(s => s.status === 'completed').length;

  // Filter services based on search and category
  const filteredServices = mockServices.filter(service => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        service.serviceType.toLowerCase().includes(query) ||
        service.providerName.toLowerCase().includes(query)
      );
    }
    if (selectedCategory) {
      return service.serviceType.toLowerCase().includes(selectedCategory.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Services</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{activeServices}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Service Providers</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{totalProviders}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Scheduled</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{scheduledServices}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{completedServices}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
          className="rounded-full"
        >
          All Services
        </Button>
        {Object.entries(serviceCategories).map(([key, label]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(key)}
            className="rounded-full"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search services or providers..."
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

      {/* Services List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:bg-gray-50">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{service.serviceType}</h3>
                    <p className="text-sm text-gray-500">{service.providerName}</p>
                  </div>
                  <Badge
                    variant={
                      service.status === 'completed'
                        ? 'success'
                        : service.status === 'in_progress'
                        ? 'info'
                        : service.status === 'scheduled'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {service.status.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span>{formatDate(service.startDate)}</span>
                  </div>
                  {service.endDate && (
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span>{formatDate(service.endDate)}</span>
                    </div>
                  )}
                  {service.programName && (
                    <div className="flex justify-between">
                      <span>Program:</span>
                      <span>{service.programName}</span>
                    </div>
                  )}
                </div>

                {service.notes && (
                  <p className="text-sm text-gray-700">{service.notes}</p>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button size="sm">Update Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <h3 className="text-sm font-medium text-gray-900">No services found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or add a new service
          </p>
        </div>
      )}
    </div>
  );
}