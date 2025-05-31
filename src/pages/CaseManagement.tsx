import React, { useState } from 'react';
import { Search, Bell, Clock, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { mockClients, mockNotes } from '../data/mockData';
import { formatDate } from '../lib/utils';
import { TaskDialog } from '../components/case-management/TaskDialog';
import { CaseNoteDialog } from '../components/case-management/CaseNoteDialog';

const taskStatuses = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
  overdue: { label: 'Overdue', color: 'bg-red-100 text-red-800' },
};

const mockTasks = [
  {
    id: '1',
    title: 'Complete VI-SPDAT Assessment',
    clientId: '1',
    dueDate: '2024-03-25',
    status: 'pending',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Schedule Housing Interview',
    clientId: '2',
    dueDate: '2024-03-23',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Follow-up on Rental Application',
    clientId: '3',
    dueDate: '2024-03-20',
    status: 'overdue',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Document Income Verification',
    clientId: '4',
    dueDate: '2024-03-28',
    status: 'completed',
    priority: 'medium',
  },
];

export function CaseManagement() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [tasks, setTasks] = useState(mockTasks);
  const [notes, setNotes] = useState(mockNotes);
  const [showCaseNoteDialog, setShowCaseNoteDialog] = useState(false);

  const recentInteractions = notes.slice(0, 5);
  const upcomingTasks = tasks.filter(task => task.status !== 'completed').slice(0, 3);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (taskId: string, updates: any) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleAddCaseNote = (note: any) => {
    const newNote = {
      id: `note-${Date.now()}`,
      authorId: '1', // Current user ID
      authorName: 'John Appleseed', // Current user name
      ...note,
    };
    setNotes([newNote, ...notes]);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Cases</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">24</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                <Bell className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">12</p>
              </div>
              <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Due This Week</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">8</p>
              </div>
              <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="mt-1 text-3xl font-semibold text-red-600">3</p>
              </div>
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-2">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowCaseNoteDialog(true)}
        >
          <Plus className="h-4 w-4" />
          Add Case Note
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <button
                    className={`border-b-2 pb-4 text-sm font-medium ${
                      activeTab === 'tasks'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('tasks')}
                  >
                    Tasks
                  </button>
                  <button
                    className={`border-b-2 pb-4 text-sm font-medium ${
                      activeTab === 'interactions'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab('interactions')}
                  >
                    Interactions
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
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
            </CardHeader>
            <CardContent className="p-6">
              {activeTab === 'tasks' ? (
                <div className="space-y-4">
                  {tasks.map((task) => {
                    const client = mockClients.find((c) => c.id === task.clientId);
                    return (
                      <div
                        key={task.id}
                        className="flex items-start space-x-4 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleTaskClick(task)}
                      >
                        <Avatar
                          src={client?.profileImage}
                          alt={client ? `${client.firstName} ${client.lastName}` : ''}
                          size="md"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                            <Badge
                              variant={
                                task.status === 'completed'
                                  ? 'success'
                                  : task.status === 'in_progress'
                                  ? 'info'
                                  : task.status === 'overdue'
                                  ? 'danger'
                                  : 'warning'
                              }
                            >
                              {taskStatuses[task.status as keyof typeof taskStatuses].label}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>Due {formatDate(task.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentInteractions.map((interaction) => {
                    const client = mockClients.find((c) => c.id === interaction.clientId);
                    return (
                      <div
                        key={interaction.id}
                        className="flex items-start space-x-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
                      >
                        <Avatar
                          src={client?.profileImage}
                          alt={client ? `${client.firstName} ${client.lastName}` : ''}
                          size="md"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              {client ? `${client.firstName} ${client.lastName}` : 'Unknown Client'}
                            </h4>
                            <Badge variant="secondary">{interaction.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-700">{interaction.content}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{interaction.authorName}</span>
                            <span>{formatDate(interaction.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => {
                  const client = mockClients.find((c) => c.id === task.clientId);
                  return (
                    <div key={task.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar
                          src={client?.profileImage}
                          alt={client ? `${client.firstName} ${client.lastName}` : ''}
                          size="sm"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{task.title}</p>
                          <p className="text-xs text-gray-500">Due {formatDate(task.dueDate)}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          task.priority === 'high'
                            ? 'danger'
                            : task.priority === 'medium'
                            ? 'warning'
                            : 'info'
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-px bg-gray-200"></div>
                  <div className="space-y-6 pl-6">
                    {recentInteractions.slice(0, 3).map((interaction, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-[1.625rem] mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {interaction.authorName} added a note
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {formatDate(interaction.createdAt)}
                          </p>
                          <p className="mt-2 text-sm text-gray-700">{interaction.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedTask && (
        <TaskDialog
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
        />
      )}

      <CaseNoteDialog
        isOpen={showCaseNoteDialog}
        onClose={() => setShowCaseNoteDialog(false)}
        onSubmit={handleAddCaseNote}
      />
    </div>
  );
}