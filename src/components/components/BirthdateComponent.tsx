'use client';

interface BirthdateComponentProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function BirthdateComponent({ value, onChange, error }: BirthdateComponentProps) {
  return (
    <div>
      <label htmlFor="birthdate" className="block text-sm font-medium text-gray-300 mb-2">
        Birthdate
      </label>
      <input
        type="date"
        id="birthdate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white ${
          error ? 'border-red-500' : 'border-gray-600'
        }`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
