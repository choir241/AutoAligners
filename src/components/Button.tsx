import { Button } from "@/components/ui/button"
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  "tracking-normal normal-case leading-normal capitalize inline-block text-center no-underline rounded bg-black border-none text-white text-2xl px-8 py-3 cursor-pointer",
  {
    variants: {
      variant: {
          default: "default",
          destructive: "destructive",
          outline: "outline",
          secondary: "secondary",
          ghost: "ghost",
          link: "link",
      }
    }
  }
)

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>{
      text: string;
    }

export default forwardRef<HTMLButtonElement, ButtonProps>(function ButtonComponent({variant, className, text, ...props}, ref){
  return (
  <Button 
  variant={variant} 
  {...props}
  className={className}>
    {text}
  </Button>
  )
})
