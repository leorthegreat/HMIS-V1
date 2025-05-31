import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/dashboard/StatCard';
import { mockDashboardStats, mockClients, mockUsers, mockNotes } from '../data/mockData';
import { ClientCard } from '../components/clients/ClientCard';
import { Input } from '../components/ui/Input';
import { Search, Users, ClipboardList, Building2, FileText, Plus, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDate } from '../lib/utils';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = mockUsers[0];

  const filteredClients = mockClients
    .filter(client => {
      if (!searchQuery) return (client.priorityScore || 0) >= 80;
      
      const query = searchQuery.toLowerCase();
      const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
      return fullName.includes(query) || 
             (client.email && client.email.toLowerCase().includes(query)) ||
             (client.phone && client.phone.includes(query));
    })
    .slice(0, 3);

  const myClients = mockClients.filter(client => client.caseManagerId === currentUser.id);
  const myProperties = Array.from(new Set(myClients.map(client => client.program?.id).filter(Boolean)));
  const thisMonthNotes = mockNotes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const today = new Date();
    return noteDate.getMonth() === today.getMonth() && 
           noteDate.getFullYear() === today.getFullYear() &&
           note.authorId === currentUser.id;
  });

  const thisWeekNotes = mockNotes.filter(note => {
    const noteDate = new Date(note.createdAt);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    weekStart.setHours(0, 0, 0, 0);
    return noteDate >= weekStart && note.authorId === currentUser.id;
  });

  const recentClients = myClients.slice(0, 4);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
      
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Search clients by name, email, or phone..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <h3 className="mb-4 text-xl font-medium text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900">New Client Intake</h4>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900">Start Assessment</h4>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-purple-100 p-3">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900">Schedule Service</h4>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4 rounded-full bg-amber-100 p-3">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="font-medium text-gray-900">Generate Report</h4>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockDashboardStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Your Clients</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{myClients.length}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {recentClients.map(client => (
                <Link 
                  key={client.id}
                  to={`/clients/${client.id}`}
                  className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={client.profileImage}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">
                        {client.firstName} {client.lastName}
                      </p>
                      <Badge variant={client.housingStatus}>
                        {client.housingStatus.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              ))}
              {myClients.length > 4 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => window.location.href = '/clients'}
                >
                  View All Clients
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Tasks</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">8</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <ClipboardList className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Due Today</span>
                <span className="font-medium text-gray-900">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Overdue</span>
                <span className="font-medium text-red-600">2</span>
              </div>
              <Button size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Case Notes This Month</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{thisMonthNotes.length}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Notes added this week</span>
                <span className="font-medium text-gray-900">{thisWeekNotes.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Entry</span>
                <span className="font-medium text-gray-900">
                  {thisMonthNotes.length > 0 ? formatDate(thisMonthNotes[0].createdAt) : 'No entries'}
                </span>
              </div>
              <Button size="sm" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Case Note
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Your Properties</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{myProperties.length}</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <div className="h-2 rounded-full bg-gray-200">
                <div 
                  className="h-2 rounded-full bg-green-500" 
                  style={{ width: '85%' }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">85% occupancy rate</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                {searchQuery ? 'Search Results' : 'High Priority Clients'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map(client => (
                  <ClientCard key={client.id} client={client} />
                ))}
                {filteredClients.length === 0 && (
                  <div className="py-4 text-center text-gray-500">
                    No clients found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500 ring-4 ring-white"></div>
                    <div className="absolute top-4 bottom-0 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">New client intake completed</p>
                    <p className="text-xs text-gray-500">Today, 9:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-500 ring-4 ring-white"></div>
                    <div className="absolute top-4 bottom-0 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Housing placement confirmed</p>
                    <p className="text-xs text-gray-500">Today, 8:15 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-amber-500 ring-4 ring-white"></div>
                    <div className="absolute top-4 bottom-0 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Referral to Community Health Clinic</p>
                    <p className="text-xs text-gray-500">Yesterday, 4:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-purple-500 ring-4 ring-white"></div>
                    <div className="absolute top-4 bottom-0 left-1/2 -ml-px h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Assessment completed</p>
                    <p className="text-xs text-gray-500">Yesterday, 2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="relative mt-1">
                    <div className="h-2 w-2 rounded-full bg-red-500 ring-4 ring-white"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Shelter capacity alert</p>
                    <p className="text-xs text-gray-500">Yesterday, 10:15 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}