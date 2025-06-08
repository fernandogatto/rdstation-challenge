import React from 'react';
import { Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="py-12 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full theme-bg-secondary">
        <Search className="text-primary" />
      </div>
      <p className="mb-2 text-lg font-medium">Nenhum resultado encontrado</p>
    </div>
  );
};

export default NotFound;
