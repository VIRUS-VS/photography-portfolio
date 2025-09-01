import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
        {children}
    </a>
)

const Footer = () => {
    const { settings, loading } = useSiteSettings();

    if (loading) return null;

  return (
    <footer id="contact-section" className="bg-black text-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h3 className="font-thin text-2xl tracking-widest uppercase mb-4">Editor's Portfolio</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                    {settings?.instagramUrl && <SocialIcon href={settings.instagramUrl}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></SocialIcon>}
                    {settings?.facebookUrl && <SocialIcon href={settings.facebookUrl}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></SocialIcon>}
                    {settings?.twitterUrl && <SocialIcon href={settings.twitterUrl}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></SocialIcon>}
                </div>
            </div>
            <div className="text-sm">
                <p className="font-semibold mb-2">Mumbai . Bangalore</p>
                <a href="#" className="hover:underline text-gray-400">Privacy Policy</a>
            </div>
            <div className="text-sm">
                 <p>{settings?.contactPhone || '+91 98765 43210'}</p>
                 <a href={`mailto:${settings?.contactEmail}`} className="hover:underline text-gray-400">{settings?.contactEmail || 'contact@example.com'}</a>
            </div>
        </div>
        <div className="text-center text-xs text-gray-500 pt-8 mt-8 border-t border-gray-800">
             &copy; {new Date().getFullYear()} Editor's Portfolio. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;