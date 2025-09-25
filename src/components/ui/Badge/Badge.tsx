import { cn } from "../../utils";
import { type HTMLAttributes } from "react";

function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium",
        "bg-gray-100 text-gray-700 text-xs font-medium backdrop-blur-sm",
        "whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}
export default Badge;
