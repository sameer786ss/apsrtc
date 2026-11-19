import { Loader } from 'lucide-react';

interface SpinnerProps { size?: number; className?: string; }

export default function Spinner({ size = 32, className = '' }: SpinnerProps) {
  return <Loader size={size} className={`animate-spin text-red-700 ${className}`} />;
}
