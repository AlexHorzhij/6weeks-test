import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-input bg-background px-3 py-2 focus-visible:ring-ring",
        premium: "bg-card border-border/50 px-4 py-3 focus:border-primary focus:ring-primary/20 focus-visible:ring-primary/20",
      },
      error: {
        true: "border-destructive focus:border-destructive focus:ring-destructive/20 focus-visible:ring-destructive/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      error: false,
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "ref">,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, error, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
