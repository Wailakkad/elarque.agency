import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'secondaryLight' | 'outlineFill';
type ButtonSize = 'sm' | 'md';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-terracotta text-alabaster border border-terracotta hover:bg-terracotta-hover hover:border-terracotta-hover',
  secondary:
    'bg-transparent text-umber border border-umber hover:bg-sand/70',
  secondaryLight:
    'bg-transparent text-alabaster border border-alabaster hover:bg-alabaster/10',
  outlineFill:
    'bg-transparent text-umber border border-umber hover:bg-umber hover:text-alabaster',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px] min-h-[38px]',
  md: 'px-6 py-3.5 text-[15px] min-h-[46px]',
};

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...rest
  } = props;

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-[2px] font-sans font-medium whitespace-nowrap shrink-0 transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-60 disabled:pointer-events-none';

  const classes = `${baseClasses} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if ('href' in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<ButtonAsAnchor, keyof BaseProps>;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof BaseProps>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
};
