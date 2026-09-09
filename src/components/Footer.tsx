import Link from "next/link";
import { siteConfig } from "@/content/site-config";

const QUICK_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/offers", label: "Offers" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold tracking-tight">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide">Quick Links</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide">Visit Us</p>
          <address className="mt-4 space-y-1.5 text-sm not-italic leading-relaxed text-muted-foreground">
            <p>{siteConfig.address.line1}</p>
            <p>
              {siteConfig.address.city}, {siteConfig.address.state}{" "}
              {siteConfig.address.postalCode}
            </p>
            <p>Weekdays: {siteConfig.hours.weekdays}</p>
            <p>Weekends: {siteConfig.hours.weekends}</p>
            <p>{siteConfig.phone}</p>
          </address>
        </div>
      </div>

      <div className="border-t px-4 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/legal/privacy-policy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms-of-membership"
              className="transition-colors hover:text-foreground"
            >
              Membership Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
