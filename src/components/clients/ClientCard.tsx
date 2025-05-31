import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Client } from '../../types';
import { formatDate } from '../../lib/utils';

const housingStatusLabels = {
  housed: 'Housed',
  homeless: 'Homeless',
  at_risk: 'At Risk',
  transitional: 'Transitional',
};

interface ClientCardProps {
  client: Client;
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/clients/${client.id}`}>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar 
              src={client.profileImage} 
              alt={`${client.firstName} ${client.lastName}`}
              size="lg"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {client.firstName} {client.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                Intake Date: {formatDate(client.intakeDate)}
              </p>
              <div className="mt-2">
                <Badge variant={client.housingStatus}>
                  {housingStatusLabels[client.housingStatus]}
                </Badge>
                {client.isVeteran && (
                  <Badge variant="info" className="ml-2">
                    Veteran
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-3">
          <div className="flex w-full justify-between text-sm">
            <span className="text-gray-500">
              Priority Score: <span className="font-medium text-gray-700">{client.priorityScore}</span>
            </span>
            <span className="text-gray-500">
              Last Updated: <span className="font-medium text-gray-700">{formatDate(client.lastUpdated)}</span>
            </span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}