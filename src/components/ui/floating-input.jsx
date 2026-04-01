import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * FloatingInput — input with a floating label that slides up on focus/fill.
 *
 * Usage:
 *   <FloatingInput id="name" label="First Name" value={val} onChange={...} />
 *   <FloatingInput id="notes" label="Notes" type="textarea" rows={3} value={val} onChange={...} />
 */
const FloatingInput = React.forwardRef(
  ({ id, label, type = "text", className, containerClassName, ...props }, ref) => {
    const isTextarea = type === "textarea";

    const sharedClass = cn(
      "peer w-full bg-black/25 border border-white/12 rounded-xl px-4 pt-6 pb-2",
      "text-sm text-slate-200 placeholder-transparent",
      "transition-all duration-200",
      "focus:outline-none focus:border-blue-400/55 focus:bg-black/30",
      "focus:shadow-[0_0_0_3px_rgba(99,149,235,0.15),inset_0_1px_0_rgba(255,255,255,0.06)]",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    );

    return (
      <div className={cn("relative", containerClassName)}>
        {isTextarea ? (
          <textarea
            id={id}
            ref={ref}
            placeholder=" "
            className={cn(sharedClass, "resize-none")}
            {...props}
          />
        ) : (
          <input
            id={id}
            type={type}
            ref={ref}
            placeholder=" "
            className={sharedClass}
            {...props}
          />
        )}

        {/* Floating label */}
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 top-2 text-xs text-slate-400 pointer-events-none",
            "transition-all duration-200",
            // Empty + unfocused: label sits in the middle like placeholder text
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm",
            // Focused OR has value: float up to top-2, shrink to xs, blue tint
            "peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400",
            "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
export { FloatingInput };
