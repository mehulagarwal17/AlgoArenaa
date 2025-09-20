import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#demo', label: 'Demo' },
    { href: '#pricing', label: 'Pricing' },
  ];

  const socialLinks = [
    { href: '#', icon: <Twitter className="h-5 w-5" /> },
    { href: '#', icon: <Github className="h-5 w-5" /> },
    { href: '#', icon: <Linkedin className="h-5 w-5" /> },
  ];

  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.icon}
              <span className="sr-only">Social media link</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-muted-foreground">
            &copy; {new Date().getFullYear()} AlgoArena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
