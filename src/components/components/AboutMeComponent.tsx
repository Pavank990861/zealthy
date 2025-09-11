'use client';

interface AboutMeComponentProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function AboutMeComponent({ value, onChange, error }: AboutMeComponentProps) {
  return (
    <div>
      <label htmlFor="about_me" className="block text-sm font-medium text-gray-300 mb-2">
        About Me
      </label>
      <textarea
        id="about_me"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 resize-none ${
          error ? 'border-red-500' : 'border-gray-600'
        }`}
        placeholder="Tell us about yourself..."
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
