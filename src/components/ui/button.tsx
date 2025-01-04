import * as React from "react"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button className={`btn ${className}`} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button };
