export interface NavLinkType {
  id: string;
  name: string;
  href: string;
}
export const NavLinksList: NavLinkType[] = [
  { id: 'home', name: 'Home', href: '/' },
  { id: 'tools', name: 'Tools', href: '/tools' },
  { id: 'templates', name: 'Templates', href: '/templates' },
  { id: 'help', name: 'Help', href: '/help' },
  { id: 'pricing', name: 'Pricing', href: '/pricing' },
];
