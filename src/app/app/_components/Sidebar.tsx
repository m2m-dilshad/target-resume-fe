'use client';

import Link from 'next/link';
import { PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import Button from '@/components/ui/Button';
import Typography from '@/components/ui/Typography';
import Logo from '@/components/Logo';
import { SidebarLinksList } from '../_constants/sidebar-links';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'border-border bg-surface border-r transition-all duration-300',
          open ? 'w-64' : 'w-16'
        )}
      >
        <div className="flex items-center gap-2 p-4">
          {open && <Logo href="/admin /" logoSize={30} textSize="sm" className="font-bold" />}

          <Button theme="ghost" size="xs" className="h-10 w-10" onClick={() => setOpen(!open)}>
            <PanelLeft className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-1 p-3">
          {SidebarLinksList.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.id}
                href={link.href}
                className="text-foreground hover:bg-primary/10 flex items-center gap-3 rounded-md px-3 py-2 text-sm"
              >
                <Icon className="h-4 w-4" />
                {open && <Typography variant="span">{link.name}</Typography>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
