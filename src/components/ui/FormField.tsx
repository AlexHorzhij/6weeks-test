import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Label } from "./label";
import { FormError } from "./FormError";

interface FormFieldProps {
  id: string;
  label: string;
  icon: LucideIcon;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  delay?: string;
}

export function FormField({
  id,
  label,
  icon: Icon,
  required,
  optional,
  error,
  children,
  delay = "0.1s",
}: FormFieldProps) {
  return (
    <div className="space-y-2 animate-fade-in" style={{ animationDelay: delay }}>
      <Label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-medium text-foreground"
      >
        <Icon className="h-4 w-4 text-primary" />
        {label}
        {required && <span className="text-destructive">*</span>}
        {optional && (
          <span className="text-muted-foreground text-xs">(необов'язково)</span>
        )}
      </Label>
      <div className="relative">
        {children}
      </div>
      <FormError message={error} />
    </div>
  );
}
