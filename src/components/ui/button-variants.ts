import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-semibold whitespace-nowrap transition-colors duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground hover:border-primary/80 hover:bg-primary/90",
        outline:
          "border-border/80 bg-card/35 text-foreground hover:border-primary/35 hover:bg-muted/45",
        secondary:
          "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "border-transparent text-foreground hover:bg-muted/55",
        destructive:
          "border-destructive/25 bg-destructive/10 text-destructive hover:bg-destructive/15",
        inverse:
          "border-black/15 bg-background text-foreground hover:border-black/25 hover:bg-background/90",
        link: "h-auto border-transparent px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-10 px-4",
        xs: "h-7 gap-1 px-2.5 text-xs",
        sm: "h-9 px-4 text-[0.82rem]",
        md: "min-h-11 px-4",
        lg: "min-h-12 px-5",
        icon: "size-11 px-0",
        "icon-xs": "size-7 px-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9 px-0 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-12 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
