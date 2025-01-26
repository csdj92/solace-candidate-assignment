interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={`animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full ${className || ''}`} />
  );
} 