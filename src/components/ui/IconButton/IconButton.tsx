import * as React from "react";
import styles from "./IconButton.module.scss";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "ghost";
};

export const IconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        data-variant={variant}
        className={`${styles.btn} ${className ?? ""}`}
        {...props}
      />
    );
  },
);

IconButton.displayName = "IconButton";
