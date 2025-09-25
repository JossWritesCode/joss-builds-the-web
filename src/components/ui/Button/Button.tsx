import { cn } from "../../utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", ...props },
  ref
) {
  const base =
    "inline-flex items-center justify-center rounded-xl2 px-4 py-2 text-sm font-semibold transition shadow-soft focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-dracula-accent text-white hover:opacity-90 focus-visible:ring-2 focus-visible:ring-dracula-accent/40",
    secondary:
      "bg-white text-dracula-text border border-dracula-muted/30 hover:bg-dracula-highlight/5",
    ghost: "bg-transparent text-dracula-text hover:bg-dracula-muted/10",
  };
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
});
export default Button;
