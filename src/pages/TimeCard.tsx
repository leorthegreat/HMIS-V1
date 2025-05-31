import React, { useState } from 'react';
import { Calendar, Clock, Filter, Plus, Search, Users, Briefcase, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockClients, mockUsers } from '../data/mockData';
import { formatDate } from '../lib/utils';

const activityTypes = {
  client_meeting: 'Client Meeting',
  case_notes: 'Case Notes',
  assessment: 'Assessment',
  coordination: 'Service Coordination',
  admin: 'Administrative',
  travel: 'Travel Time',
  training: 'Training',
  other: 'Other',
};

const mockTimeEntries = [
  {
    id: '1',
    userId: '1',
    clientId: '1',
    date: '2024-03-20',
    startTime: '09:00',
    endTime: '10:30',
    duration: 1.5,
    activityType: 'client_meeting',
    description: 'Initial intake assessment and housing plan discussion',
    status: 'submitted',
  },
  {
    id: '2',
    userId: '1',
    clientId: '2',
    date: '2024-03-20',
    startTime: '11:00',
    endTime: '12:00',
    duration: 1,
    activityType: 'case_notes',
    description: 'Updated case notes and service plan',
    status: 'pending',
  },
  {
    id: '3',
    userId: '1',
    clientId: '3',
    date: '2024-03-20',
    startTime: '13:30',
    endTime: '15:00',
    duration: 1.5,
    activityType: 'coordination',
    description: 'Coordinated with housing provider for placement',
    status: 'approved',
  },
];

export function TimeCard() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const currentUser = mockUsers[0];
  const todayEntries = mockTimeEntries.filter(entry => entry.date === selectedDate);
  
  const totalHours = todayEntries.reduce((acc, entry) => acc + entry.duration, 0);
  const clientMeetings = todayEntries.filter(entry => entry.activityType === 'client_meeting').length;
  const pendingEntries = todayEntries.filter(entry => entry.status === 'pending').length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Time Card</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Time Entry
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Hours Today</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{totalHours}</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Client Meetings</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{clientMeetings}</p>
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
                <p className="text-sm font-medium text-gray-500">Activities</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{todayEntries.length}</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">{pendingEntries}</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3 text-amber-600">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selection and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search activities..."
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
      </div>

      {/* Time Entries */}
      <div className="space-y-4">
        {todayEntries.map((entry) => {
          const client = mockClients.find(c => c.id === entry.clientId);
          
          return (
            <Card key={entry.id} className="overflow-hidden hover:bg-gray-50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-4">
                    {client && (
                      <Avatar
                        src={client.profileImage}
                        alt={`${client.firstName} ${client.lastName}`}
                        size="md"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">
                          {activityTypes[entry.activityType as keyof typeof activityTypes]}
                        </h3>
                        <Badge
                          variant={
                            entry.status === 'approved'
                              ? 'success'
                              : entry.status === 'pending'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {entry.status}
                        </Badge>
                      </div>
                      {client && (
                        <p className="text-sm text-gray-500">
                          Client: {client.firstName} {client.lastName}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        {entry.startTime} - {entry.endTime} ({entry.duration} hours)
                      </p>
                      <p className="mt-2 text-sm text-gray-700">{entry.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Submit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {todayEntries.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
            <h3 className="text-sm font-medium text-gray-900">No time entries for this date</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a new time entry to start tracking your activities
            </p>
          </div>
        )}
      </div>

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 7 }).map((_, index) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + index);
              const isToday = date.toISOString().split('T')[0] === selectedDate;
              
              return (
                <div
                  key={index}
                  className={`text-center ${
                    isToday ? 'rounded-lg bg-blue-50 p-2' : ''
                  }`}
                >
                  <p className="text-sm font-medium text-gray-500">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {Math.floor(Math.random() * 4 + 4)}
                  </p>
                  <p className="text-xs text-gray-500">hours</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}