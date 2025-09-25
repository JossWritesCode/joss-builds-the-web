import { cn } from "../../utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot"; // Radix slot

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";

  const base =
    "inline-flex items-center justify-center rounded-xl2 font-semibold transition shadow-soft focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-dracula-accent text-white md:hover:opacity-90 focus-visible:ring-2 focus-visible:ring-dracula-accent/40 active:scale-[0.98]",
    secondary:
      "bg-white text-dracula-text border border-dracula-muted/30 md:hover:bg-dracula-highlight/5 active:scale-[0.98]",
    ghost:
      "bg-transparent text-dracula-text md:hover:bg-dracula-muted/10 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <Comp
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export default Button;
