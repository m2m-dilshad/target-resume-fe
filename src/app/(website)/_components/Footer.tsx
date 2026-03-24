import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import Logo from './Logo';

const footerLinks = {
  product: [
    { href: '/builder', label: 'Resume Builder' },
    { href: '/skill-gap', label: 'Skill Analysis' },
    { href: '/feedback', label: 'Resume Feedback' },
  ],
  company: [
    { href: '#', label: 'About' },
    { href: '#', label: 'Blog' },
    { href: '#', label: 'Careers' },
  ],
  legal: [
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Terms' },
    { href: '#', label: 'Security' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-border border-t" role="contentinfo">
      <div className="container mx-auto max-w-(--page-width) py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Logo Section */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <Typography
              variant="p"
              size="xs"
              className="text-typography-primary mt-4 ps-10 text-left"
            >
              AI-powered resume optimization for landing your dream job.
            </Typography>
          </div>

          {/* Product Links */}
          <nav aria-label="Product links">
            <Heading variant="h6" className="font-section-titles text-typography-muted mb-4">
              Product
            </Heading>

            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground rounded transition-colors"
                  >
                    <Typography
                      variant="span"
                      size="xs"
                      className="text-typography-muted font-heading1"
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-label="Company links">
            <Heading variant="h6" className="font-section-titles text-typography-muted mb-4">
              Company
            </Heading>

            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground rounded transition-colors"
                  >
                    <Typography
                      variant="span"
                      size="xs"
                      className="text-typography-muted font-heading1"
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav aria-label="Legal links">
            <Heading variant="h6" className="font-section-titles text-typography-muted mb-4">
              Legal
            </Heading>

            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground rounded transition-colors"
                  >
                    <Typography
                      variant="span"
                      size="xs"
                      className="text-typography-muted font-heading1"
                    >
                      {link.label}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Copyright */}
        <div className="border-border mt-12 border-t pt-8 text-center">
          <Typography variant="p" size="xs" className="text-typography-muted">
            &copy; 2026 TargetResume.ai. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
}
