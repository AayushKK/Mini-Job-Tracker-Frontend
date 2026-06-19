interface BadgeProps {
  variant?: 'blue' | 'yellow' | 'green' | 'red' | 'gray';
  children: React.ReactNode;
}

const variants = {
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function Badge({ variant = 'gray', children }: BadgeProps) {
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>;
}