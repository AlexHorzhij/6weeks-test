interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <p className="text-sm text-destructive flex items-center gap-1 animate-slide-in">
      {message}
    </p>
  );
}
