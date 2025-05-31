import React, { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { mockClients, mockNotes, mockServices, mockAssessments } from '../data/mockData';
import { formatDate, calculateAge } from '../lib/utils';

const housingStatusLabels = {
  housed: 'Housed',
  homeless: 'Homeless',
  at_risk: 'At Risk',
  transitional: 'Transitional',
};

export function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const isFullPage = location.pathname.startsWith('/client/');
  
  const client = mockClients.find(c => c.id === id);
  const clientNotes = mockNotes.filter(note => note.clientId === id);
  const clientServices = mockServices.filter(service => service.clientId === id);
  const clientAssessments = mockAssessments.filter(assessment => assessment.clientId === id);
  
  if (!client) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-medium text-gray-900">Client Not Found</h2>
          <p className="mb-4 text-gray-500">The client you're looking for doesn't exist or has been removed.</p>
          <Link to="/clients">
            <Button>Back to Client List</Button>
          </Link>
        </div>
      </div>
    );
  }

  const content = (
    <div className="space-y-6">
      {/* Client Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <Avatar 
              src={client.profileImage}
              alt={`${client.firstName} ${client.lastName}`}
              size="lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {client.firstName} {client.lastName}
              </h1>
              <div className="mt-1 flex items-center space-x-2">
                <Badge variant={client.housingStatus}>
                  {housingStatusLabels[client.housingStatus]}
                </Badge>
                {client.isVeteran && (
                  <Badge variant="info">Veteran</Badge>
                )}
                {client.hasDisability && (
                  <Badge variant="info">Disability</Badge>
                )}
              </div>
              {client.program && (
                <p className="mt-2 text-sm text-gray-600">
                  Program: {client.program.name}
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2 md:mt-0">
            <Button variant="outline">Edit Profile</Button>
            <Button>Create Referral</Button>
          </div>
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex space-x-6 overflow-x-auto">
            <button
              className={`border-b-2 pb-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`border-b-2 pb-2 text-sm font-medium ${
                activeTab === 'case-notes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('case-notes')}
            >
              Case Notes
            </button>
            <button
              className={`border-b-2 pb-2 text-sm font-medium ${
                activeTab === 'services'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('services')}
            >
              Services
            </button>
            <button
              className={`border-b-2 pb-2 text-sm font-medium ${
                activeTab === 'assessments'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('assessments')}
            >
              Assessments
            </button>
            <button
              className={`border-b-2 pb-2 text-sm font-medium ${
                activeTab === 'documents'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              Documents
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                    <p className="text-gray-900">{client.dateOfBirth ? formatDate(client.dateOfBirth) : 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                    <p className="text-gray-900">{client.gender || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Ethnicity</h4>
                    <p className="text-gray-900">{client.ethnicity || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Race</h4>
                    <p className="text-gray-900">{client.race || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p className="text-gray-900">{client.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p className="text-gray-900">{client.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">SSN</h4>
                    <p className="text-gray-900">{client.ssn || 'Not provided'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Veteran Status</h4>
                    <p className="text-gray-900">{client.isVeteran ? 'Veteran' : 'Non-veteran'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Disability Status</h4>
                    <p className="text-gray-900">{client.hasDisability ? 'Has disability' : 'No disability'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Housing Status</h4>
                    <p className="text-gray-900">{housingStatusLabels[client.housingStatus]}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Intake Date</h4>
                    <p className="text-gray-900">{formatDate(client.intakeDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                    <p className="text-gray-900">{formatDate(client.lastUpdated)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
              </CardHeader>
              <CardContent>
                {client.program ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Program Name</h4>
                        <p className="text-gray-900">{client.program.name}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Program Type</h4>
                        <p className="text-gray-900">{client.program.type.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Provider</h4>
                        <p className="text-gray-900">{client.program.provider}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Address</h4>
                        <p className="text-gray-900">{client.program.address}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Occupancy</h4>
                        <p className="text-gray-900">{client.program.currentOccupancy} / {client.program.capacity}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No program information available</p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Household</CardTitle>
              </CardHeader>
              <CardContent>
                {client.household && client.household.length > 0 ? (
                  <div className="space-y-4">
                    {client.household.map((member) => (
                      <div key={member.id} className="flex items-center space-x-4 rounded-lg border border-gray-100 p-4">
                        <Avatar
                          src={member.profileImage}
                          alt={`${member.firstName} ${member.lastName}`}
                          size="sm"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {member.firstName} {member.lastName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {member.relationship} • {calculateAge(member.dateOfBirth)} years old
                          </p>
                        </div>
                        {member.isHeadOfHousehold && (
                          <Badge variant="secondary">Head of Household</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No household members recorded</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Priority Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="relative h-36 w-36">
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
                        stroke={client.priorityScore && client.priorityScore >= 80 ? '#EF4444' : client.priorityScore && client.priorityScore >= 60 ? '#F59E0B' : '#10B981'}
                        strokeWidth="3"
                        strokeDasharray={`${client.priorityScore || 0}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-3xl font-bold">{client.priorityScore || 0}</span>
                      <span className="text-sm text-gray-500">Priority</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>
                {client.location?.address ? (
                  <div>
                    <p className="text-gray-900">{client.location.address}</p>
                    <div className="mt-2 h-32 rounded-md bg-gray-200">
                      {/* Map placeholder - would integrate with actual map component */}
                      <div className="flex h-full items-center justify-center text-gray-500">
                        Interactive Map
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No location information available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'case-notes' && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium text-gray-900">Case Notes</h3>
            <Button>Add Note</Button>
          </div>
          
          
          {clientNotes.length > 0 ? (
            <div className="space-y-4">
              {clientNotes.map(note => (
                <Card key={note.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Badge variant={note.category as any}>{note.category}</Badge>
                        <div>
                          <p className="text-sm text-gray-500">
                            {note.authorName} • {formatDate(note.createdAt)}
                          </p>
                          <p className="mt-2 text-gray-900">{note.content}</p>
                        </div>
                      </div>
                      {note.isPrivate && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                          Private
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">No case notes</h3>
              <p className="text-gray-500">Add a new note to start documenting this client's case.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium text-gray-900">Services</h3>
            <Button>Add Service</Button>
          </div>
          
          {clientServices.length > 0 ? (
            <div className="space-y-4">
              {clientServices.map(service => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
                      <div>
                        <h4 className="font-medium text-gray-900">{service.serviceType}</h4>
                        <p className="text-sm text-gray-500">Provider: {service.providerName}</p>
                        {service.programName && (
                          <p className="text-sm text-gray-500">Program: {service.programName}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {formatDate(service.startDate)}
                          {service.endDate && ` - ${formatDate(service.endDate)}`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            service.status === 'completed'
                              ? 'success'
                              : service.status === 'in_progress'
                              ? 'info'
                              : service.status === 'scheduled'
                              ? 'warning'
                              : 'danger'
                          }
                        >
                          {service.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">Details</Button>
                      </div>
                    </div>
                    {service.notes && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-700">{service.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">No services</h3>
              <p className="text-gray-500">Add a new service to start tracking this client's service history.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium text-gray-900">Assessments</h3>
            <Button>New Assessment</Button>
          </div>
          
          {clientAssessments.length > 0 ? (
            <div className="space-y-4">
              {clientAssessments.map(assessment => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-start md:space-y-0">
                      <div>
                        <h4 className="font-medium text-gray-900">{assessment.type}</h4>
                        <p className="text-sm text-gray-500">
                          Assessed by {assessment.assessorName} on {formatDate(assessment.date)}
                        </p>
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                            Score: {assessment.score}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    {assessment.recommendations && (
                      <div className="mt-4 border-t border-gray-200 pt-4">
                        <h5 className="mb-1 text-sm font-medium text-gray-700">Recommendations</h5>
                        <p className="text-sm text-gray-700">{assessment.recommendations}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">No assessments</h3>
              <p className="text-gray-500">Complete an assessment to evaluate this client's needs.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium text-gray-900">Documents</h3>
            <Button>Upload Document</Button>
          </div>
          
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900">No documents</h3>
            <p className="text-gray-500">Upload documents to keep track of important client files.</p>
          </div>
        </div>
      )}
    </div>
  );

  return isFullPage ? (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <Link to="/clients">
          <Button variant="outline">← Back to Clients</Button>
        </Link>
      </div>
      {content}
    </div>
  ) : content;
}