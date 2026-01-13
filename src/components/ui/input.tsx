import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "h-10 border-input bg-background px-3 py-2 focus-visible:ring-ring",
        premium: "h-12 bg-card border-border/50 px-4 focus:border-primary focus:ring-primary/20 focus-visible:ring-primary/20",
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

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "ref">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, error, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
