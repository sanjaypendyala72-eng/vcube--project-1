import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

/**
 * UniversalLink — Single-source client-side navigation component.
 * Uses Next.js <Link> for internal routes so that clicking ANY link
 * changes the URL and updates page components IMMEDIATELY without browser
 * reload or refresh.
 *
 * For external URLs (http://, https://, mailto:, tel://, etc.) it renders
 * a standard <a> tag.
 */
export default function UniversalLink({
  to,
  href,
  children,
  className = "",
  onClick,
  target,
  rel,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}) {
  const destination = to || href || "/";

  const isExternal =
    typeof destination === "string" &&
    (destination.startsWith("http://") ||
      destination.startsWith("https://") ||
      destination.startsWith("mailto:") ||
      destination.startsWith("tel:") ||
      destination.startsWith("//"));

  // External links or explicit new-tab links → standard <a>
  if (isExternal || target === "_blank") {
    return (
      <a
        href={destination}
        className={className}
        target={target}
        rel={rel || "noopener noreferrer"}
        onClick={onClick}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal routes → Next.js <Link> for proper App Router SPA navigation
  return (
    <NextLink
      href={destination}
      className={className}
      onClick={onClick}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </NextLink>
  );
}
