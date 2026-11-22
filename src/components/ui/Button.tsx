import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent" | "success";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const BASE_BTN = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none";

const VARIANTS = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-[0.98]",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:scale-[0.98]",
  outline: "border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-[0.98]",
  ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
  link: "text-primary underline-offset-4 hover:underline",
  accent: "bg-accent text-accent-foreground shadow-sm hover:bg-accent/80 active:scale-[0.98]",
  success: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98]",
};

const SIZES = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-lg px-6 text-base",
  icon: "h-9 w-9 p-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const combinedClassName = cn(BASE_BTN, VARIANTS[variant], SIZES[size], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref: ref || (child as any).ref,
        className: cn(combinedClassName, child.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref} type={props.type || "button"} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
