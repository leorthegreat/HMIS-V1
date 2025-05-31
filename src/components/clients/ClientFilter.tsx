import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../ui/Input';
import { mockClients } from '../../data/mockData';

// Extract unique programs from clients
const programs = mockClients
  .filter(client => client.program)
  .map(client => client.program!)
  .filter((program, index, self) => 
    index === self.findIndex((p) => p.id === program.id)
  );

interface ClientFilterProps {
  onFilterChange: (filters: any) => void;
}

export function ClientFilter({ onFilterChange }: ClientFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [housingStatus, setHousingStatus] = useState<string[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  
  const housingOptions = [
    { value: 'housed', label: 'Housed' },
    { value: 'homeless', label: 'Homeless' },
    { value: 'at_risk', label: 'At Risk' },
    { value: 'transitional', label: 'Transitional' },
  ];

  const toggleHousingStatus = (value: string) => {
    if (housingStatus.includes(value)) {
      setHousingStatus(housingStatus.filter(item => item !== value));
    } else {
      setHousingStatus([...housingStatus, value]);
    }
  };

  const toggleProgram = (programId: string) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms(selectedPrograms.filter(id => id !== programId));
    } else {
      setSelectedPrograms([...selectedPrograms, programId]);
    }
  };

  // Apply filters whenever any filter changes
  React.useEffect(() => {
    onFilterChange({
      searchQuery,
      housingStatus: housingStatus.length > 0 ? housingStatus : null,
      programIds: selectedPrograms.length > 0 ? selectedPrograms : null,
    });
  }, [searchQuery, housingStatus, selectedPrograms]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search clients..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white">
        <button
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          className="flex w-full items-center justify-between p-4"
        >
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          {isFiltersVisible ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {isFiltersVisible && (
          <div className="space-y-4 border-t border-gray-200 p-4">
            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Housing Status</p>
              <div className="flex flex-wrap gap-2">
                {housingOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      housingStatus.includes(option.value)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleHousingStatus(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Programs</p>
              <div className="flex flex-wrap gap-2">
                {programs.map((program) => (
                  <button
                    key={program.id}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedPrograms.includes(program.id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleProgram(program.id)}
                  >
                    {program.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}