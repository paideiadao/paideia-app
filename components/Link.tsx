import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import NextLink from "next/link";
import { Link as MuiLink } from "@mui/material";
import { SxProps } from "@mui/material";

// This component will use NextLink for internal links and MuiLink for external
// It will also skin internal links with the MuiLink wrapper

interface INextLinkComposedProps {
  to: URL | string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  className?: string;
}

const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  INextLinkComposedProps
>((props, ref) => {
  const { to, replace, scroll, shallow, prefetch, ...other } = props;
  return (
    <NextLink
      href={to}
      passHref
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <a ref={ref} {...other} />
    </NextLink>
  );
});

interface ILinkProps {
  children: React.ReactNode;
  className?: string;
  href: URL | string;
  noLinkStyle?: boolean;
  activeClassName?: string;
  sx?: SxProps;
}

const Link = React.forwardRef<HTMLAnchorElement, ILinkProps>((props, ref) => {
  const {
    activeClassName = "active",
    className: classNameProps,
    href,
    noLinkStyle,
    sx,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <a
          className={className}
          href={href}
          ref={ref}
          target="_blank"
          rel="noopener"
          {...other}
        />
      );
    }

    return (
      <MuiLink
        className={className}
        href={href}
        ref={ref}
        sx={sx}
        target="_blank"
        rel="noopener"
        {...other}
      />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed className={className} ref={ref} to={href} {...other} />
    );
  }

  return (
    <MuiLink
      to={href}
      component={NextLinkComposed}
      className={className}
      ref={ref}
      sx={sx}
      {...other}
    />
  );
});

export default Link;
