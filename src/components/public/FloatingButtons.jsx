// src/components/public/FloatingButtons.jsx
import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);


const FloatingButtons = () => {
    const { siteSettings } = useData();

    const socialLinks = [
        { key: 'facebook_url', icon: <Facebook size={20} />, color: 'bg-blue-600 hover:bg-blue-700' },
        { key: 'instagram_url', icon: <Instagram size={20} />, color: 'bg-pink-600 hover:bg-pink-700' },
        { key: 'tiktok_url', icon: <TikTokIcon />, color: 'bg-black hover:bg-gray-800' },
        { key: 'youtube_url', icon: <Youtube size={20} />, color: 'bg-red-600 hover:bg-red-700' },
    ];

    return (
        <>
            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
                {socialLinks.map((social) => (
                    siteSettings[social.key] && (
                        <a 
                            key={social.key}
                            href={siteSettings[social.key]} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`p-3 text-white rounded-full shadow-lg transition-transform hover:scale-110 ${social.color}`}
                        >
                            {social.icon}
                        </a>
                    )
                ))}
            </div>

            {siteSettings.whatsapp_number && (
                <a
                    href={`https://wa.me/${siteSettings.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed right-4 bottom-4 z-40 p-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-transform hover:scale-110"
                >
                    <WhatsAppIcon />
                </a>
            )}
        </>
    );
};

export default FloatingButtons;