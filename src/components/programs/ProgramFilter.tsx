import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '../ui/Input';
import { mockClients } from '../../data/mockData';

// Extract unique providers from programs
const providers = Array.from(new Set(
  mockClients
    .filter(client => client.program)
    .map(client => client.program!.provider)
));

interface ProgramFilterProps {
  onFilterChange: (filters: any) => void;
}

export function ProgramFilter({ onFilterChange }: ProgramFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);
  
  const programTypes = [
    { value: 'permanent', label: 'Permanent Housing' },
    { value: 'transitional', label: 'Transitional Housing' },
    { value: 'emergency', label: 'Emergency Shelter' },
    { value: 'rapid_rehousing', label: 'Rapid Re-housing' },
  ];

  const toggleType = (value: string) => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter(type => type !== value));
    } else {
      setSelectedTypes([...selectedTypes, value]);
    }
  };

  const toggleProvider = (provider: string) => {
    if (selectedProviders.includes(provider)) {
      setSelectedProviders(selectedProviders.filter(p => p !== provider));
    } else {
      setSelectedProviders([...selectedProviders, provider]);
    }
  };

  // Apply filters whenever any filter changes
  React.useEffect(() => {
    onFilterChange({
      searchQuery,
      types: selectedTypes.length > 0 ? selectedTypes : null,
      providers: selectedProviders.length > 0 ? selectedProviders : null,
    });
  }, [searchQuery, selectedTypes, selectedProviders]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          placeholder="Search programs..."
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
              <p className="mb-2 text-sm font-medium text-gray-700">Program Type</p>
              <div className="flex flex-wrap gap-2">
                {programTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedTypes.includes(type.value)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleType(type.value)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-gray-700">Providers</p>
              <div className="flex flex-wrap gap-2">
                {providers.map((provider) => (
                  <button
                    key={provider}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedProviders.includes(provider)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleProvider(provider)}
                  >
                    {provider}
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