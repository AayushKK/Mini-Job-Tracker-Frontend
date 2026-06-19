'use client';

import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative flex-1 max-w-md transition-transform ${isFocused ? 'scale-[1.02]' : ''}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FiSearch size={20} /></div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search by company or job title..."
        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <FiX size={18} />
        </button>
      )}
    </div>
  );
}