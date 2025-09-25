import { cn } from "../../utils";
import { type HTMLAttributes } from "react";

function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-dracula-accent/40 px-2 py-0.5 text-xs font-medium text-dracula-text bg-dracula-accent/10",
        className
      )}
      {...props}
    />
  );
}
export default Badge;
