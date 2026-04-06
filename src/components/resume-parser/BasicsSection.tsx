import { Globe, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import Github from '@/assets/icons/github.svg';

const profileIconMap: Record<
  string,
  LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  linkedin: LinkedInIcon,
  github: Github,
  website: Globe,
  portfolio: Globe,
  personal: User,
};

type Profile = {
  network?: string;
  username?: string;
  url?: string;
};

type BasicsData = {
  name?: string;
  label?: string;
  email?: string;
  phone?: string;
  location?: {
    city?: string;
    countryCode?: string;
  };
  profiles?: Profile[];
};

function ProfileIcon({ network }: { network?: string }) {
  const key = network?.trim().toLowerCase() || '';
  const Icon = profileIconMap[key];
  if (!Icon) return null;
  return <Icon className="h-4 w-4 text-slate-600" />;
}

export function HeaderSection({ data }: { data: BasicsData }) {
  return (
    <div className="mb-6 border-b pb-4">
      <h1 className="heading1">{data.name}</h1>
      <p className="text-lg text-gray-700">{data.label}</p>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        {data.email && (
          <a href={`mailto:${data.email}`} className="hover:underline">
            {data.email}
          </a>
        )}
        {data.phone && (
          <a href={`tel:${data.phone}`} className="hover:underline">
            {data.phone}
          </a>
        )}
        {data.location?.city && data.location?.countryCode && (
          <span>
            {data.location.city}, {data.location.countryCode}
          </span>
        )}
      </div>
    </div>
  );
}

export default function BasicsSection({ data }: { data: BasicsData }) {
  return (
    <div>
      <HeaderSection data={data} />
      {data.profiles!.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Profile
          </h3>
          <ul className="space-y-2">
            {data.profiles!.map((profile: Profile, index: number) => {
              const hasNetwork = Boolean(profile.network?.trim());
              return (
                <li key={`${profile.username || profile.url || index}`}>
                  {profile.url ? (
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
                    >
                      {hasNetwork ? <ProfileIcon network={profile.network} /> : null}
                      <span>{profile.network ? `${profile.network}:` : ''}</span>
                      <span className="font-medium">{profile.username || profile.url}</span>
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      {hasNetwork ? <ProfileIcon network={profile.network} /> : null}
                      <span>{profile.network ? `${profile.network}:` : ''}</span>
                      <span className="font-medium">{profile.username}</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
