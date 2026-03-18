import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center text-[11px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 outline-none";
  
  const variants = {
    primary: "bg-gold text-ink px-9 py-3.5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/10 active:translate-y-0 overflow-hidden",
    outline: "border border-border text-cream px-9 py-3.5 hover:border-gold hover:text-gold hover:-translate-y-0.5 active:translate-y-0",
    ghost: "text-muted hover:text-cream px-0 py-2 group",
  };

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white/10 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
      )}
      {variant === "ghost" && (
        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className, "group")}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className, "group")} {...props}>
      {content}
    </button>
  );
};
