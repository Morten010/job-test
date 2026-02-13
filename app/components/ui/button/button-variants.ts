import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#263A32] text-white hover:bg-[#1e2e28] shadow-sm",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline:
          "border border-[#263A32] bg-transparent hover:bg-[#263A32] hover:text-white text-[#263A32]",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm",
        ghost: "hover:bg-gray-100 hover:text-gray-900",
        link: "text-[#263A32] underline-offset-4 hover:underline",
        inverted: "bg-white text-[#263A32] hover:bg-gray-100 shadow-sm",
        "outline-white":
          "border border-white text-white bg-transparent hover:bg-white hover:text-[#263A32]",
      },
      size: {
        default: "h-11 px-8 py-2",
        sm: "h-9  px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
