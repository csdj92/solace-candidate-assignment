interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
      {message}
    </div>
  );
} 