import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: pill shape, smooth cubic transition, flex layout
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold cursor-pointer select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary — blue/purple gradient pill with glow
        default:
          "btn-primary text-white",
        // Destructive
        destructive:
          "btn-destructive text-white",
        // Outline — glass border, white text, hover glow
        outline:
          "btn-outline text-foreground",
        // Secondary
        secondary:
          "btn-secondary text-foreground",
        // Ghost — minimal
        ghost:
          "btn-ghost text-muted-foreground hover:text-foreground",
        // Link
        link: "text-primary underline-offset-4 hover:underline px-0 py-0",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm:      "h-8 px-3 text-xs",
        lg:      "h-11 px-7 text-base",
        icon:    "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
