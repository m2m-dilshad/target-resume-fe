/* eslint-disable @typescript-eslint/no-explicit-any */
import { Globe, User, MailIcon, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import { useResume } from './ResumeContext';
import Image, { StaticImageData } from 'next/image';
import photoImage from '@/assets/images/auth-bg.png';
import { JUSTIFY_ALIGNMENTS } from '@/lib/constants';
import LinkedInIcon from '../svgs/LinkedIn';
import GithubIcon from '../svgs/Github';

const profileIconMap: Record<string, LucideIcon | StaticImageData | ComponentType<any>> = {
  linkedin: LinkedInIcon,
  github: GithubIcon,
  website: Globe,
  portfolio: Globe,
  personal: User,
};

function isStaticImage(icon: any): icon is StaticImageData {
  return (icon as StaticImageData).src !== undefined;
}

// function isLucideIcon(icon: any): icon is LucideIcon {
//   return typeof icon === 'function' && icon.length === 0;
// }

type Profile = {
  network?: string;
  username?: string;
  url?: string;
};

function ProfileIcon({ network }: { network?: string }) {
  const key = network?.trim().toLowerCase() || '';
  const Icon = profileIconMap[key as keyof typeof profileIconMap] || null;
  return isStaticImage(Icon) ? (
    <Image src={Icon} alt={network || ''} className="header-icon h-4 w-4" />
  ) : Icon ? (
    <Icon size="1em" className="header-icon" />
  ) : null;
}

export default function PersonalInfo() {
  const {
    config,
    data: { basics },
  } = useResume();

  const showIcons = config.header.showContactLabelsOrIcons === 'icons';
  const showLabels = config.header.showContactLabelsOrIcons === 'labels';

  let headerStyles = {} as React.CSSProperties;
  if (config.header.showPhoto === 'left') {
    headerStyles = { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' };
  } else if (config.header.showPhoto === 'right') {
    headerStyles = {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
    };
  } else if (config.header.showPhoto === 'top') {
    headerStyles = {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    };
  } else if (config.header.showPhoto === 'bottom') {
    headerStyles = {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'stretch',
    };
  }
  return (
    <div className="mb-6 flex gap-4" style={headerStyles}>
      {config.header.showPhoto !== 'none' && (
        <div style={{ alignSelf: JUSTIFY_ALIGNMENTS[config.header.alignment] }}>
          <Image
            src={photoImage}
            alt="Photo"
            className={`header-photo header-photo-${config.component.photoShape}`}
          />
        </div>
      )}
      <div className="flex-1">
        <h1 className="heading1">{basics.name}</h1>
        {config.header.roleVisible && <p className="heading3">{basics.label}</p>}
        {/* Contact Info */}
        <div className={`contacts-layout-${config.header.contactLayout}`}>
          {basics.email && (
            <div className="contacts-layout-item">
              {showIcons && (
                <span>
                  <MailIcon size="1em" className="header-icon" />
                </span>
              )}
              {showLabels && <span>Email:</span>}
              <a href={`mailto:${basics.email}`} className="hover:underline">
                {basics.email}
              </a>
            </div>
          )}
          {basics.phone && (
            <div className="contacts-layout-item">
              {showIcons && (
                <span>
                  <Phone size="1em" className="header-icon" />
                </span>
              )}
              {showLabels && <span>Phone:</span>}
              <a href={`tel:${basics.phone}`} className="hover:underline">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.location?.city && basics.location?.countryCode && (
            <div className="contacts-layout-item">
              {showIcons && (
                <span>
                  <MapPin size="1em" className="header-icon" />
                </span>
              )}
              {showLabels && <span>Location:</span>}
              <span>
                {basics.location.city}, {basics.location.countryCode}
              </span>
            </div>
          )}
          {basics.profiles?.map((profile: Profile, index: number) => {
            const hasNetwork = Boolean(profile.network?.trim());
            return (
              <div className="contacts-layout-item" key={`profile-item-${index}`}>
                {hasNetwork && (
                  <span>
                    {showIcons && <ProfileIcon network={profile.network} />}
                    {showLabels && profile.network + ':'}
                  </span>
                )}
                {profile.url ? (
                  <a href={profile.url} target="_blank" rel="noreferrer">
                    {profile.username}
                  </a>
                ) : (
                  <span>{profile.username}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
