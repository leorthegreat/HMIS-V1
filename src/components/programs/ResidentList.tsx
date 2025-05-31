import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { calculateAge } from '../../lib/utils';
import type { Client } from '../../types';

interface ResidentListProps {
  residents: Client[];
}

export function ResidentList({ residents }: ResidentListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Residents</CardTitle>
        <span className="text-sm text-gray-500">
          {residents.length} total
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {residents.map(resident => (
            <Link
              key={resident.id}
              to={`/clients/${resident.id}`}
              className="block transition-colors hover:bg-gray-50"
            >
              <div className="flex items-start space-x-4 rounded-lg border border-gray-100 p-4">
                <Avatar
                  src={resident.profileImage}
                  alt={`${resident.firstName} ${resident.lastName}`}
                  size="md"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {resident.firstName} {resident.lastName}
                    </h4>
                    <Badge variant={resident.housingStatus}>
                      {resident.housingStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {resident.dateOfBirth && `${calculateAge(resident.dateOfBirth)} years old`}
                  </p>
                  {resident.household && resident.household.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Household Members:</p>
                      <div className="mt-1 flex -space-x-2">
                        {resident.household.map(member => (
                          <Avatar
                            key={member.id}
                            src={member.profileImage}
                            alt={`${member.firstName} ${member.lastName}`}
                            size="sm"
                            className="ring-2 ring-white"
                          />
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs text-gray-500 ring-2 ring-white">
                          +{resident.household.length}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}

          {residents.length === 0 && (
            <div className="text-center text-gray-500">
              No residents currently in this program
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}