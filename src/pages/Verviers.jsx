import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, CheckCircle2, ChevronDown, Menu, X } from 'lucide-react';

const BRAND = {
  name: 'Aqua&Deb',
  phoneDisplay: '0493 41 52 83',
  phoneLink: 'tel:0493415283',
  email: 'aquadeb22@gmail.com',
  logoUrl:
    'https://scontent-lga3-3.xx.fbcdn.net/v/t39.30808-1/499261426_1646166543443500_3035594003407558786_n.jpg'
};

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Nos Services',
    href: '/#services',
    type: 'mega',
    columns: [
      {
        title: 'Plomberie',
        desc: "Solutions complètes pour l'habitat",
        items: [
          'Dépannage fuites',
          'Dépannage sanitaires',
          'Dépannage chauffage',
          'Rénovation sanitaires',
          'Entretien',
          'Service de robinetterie',
          'Service de boiler / chauffe-eau',
          'Remplacement canalisation en grès',
          'Inspection caméra et recherche fuites'
        ]
      },
      {
        title: 'Débouchage',
        desc: 'Intervention haute pression',
        items: [
          'Débouchage WC & Éviers',
          'Débouchage canalisations',
          'Inspection caméra',
          'Service de débouchage égout',
          'Service de curage et entretien'
        ]
      }
    ]
  },
  { label: 'Réalisations', href: '/realisations' },
  {
    label: 'Zones',
    href: '/#zones',
    type: 'dropdown',
    items: [
      { label: 'Toutes nos zones', href: '/zones' },
      { label: 'Namur et alentours', href: '/zones/namur' },
      { label: 'Charleroi et alentours', href: '/zones/charleroi' },
      { label: 'Liège et alentours', href: '/zones/liege' },
      { label: 'Verviers et alentours', href: '/zones/verviers' },
      { label: 'Mons et alentours', href: '/zones/mons' },
      { label: 'Brabant Wallon & Flamand', href: '/zones/brabant-wallon-flamand' }
    ]
  },
  { label: 'Contact', href: '/contact' },
  { label: 'Urgence 24/7', href: BRAND.phoneLink, isButton: true }
];

export default function VerviersPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 antialiased bg-white min-h-screen">
      <header className={`sticky top-0 z-50 bg-white border-b border-slate-100 transition-all ${isScrolled ? 'shadow-md py-2' : 'py-3'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
            <div className="font-black text-slate-900 tracking-tight">AQUA<span className="text-blue-600">&</span>DEB</div>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = String(link.href || '').startsWith('/');
              const NavComponent = isRouterLink ? Link : 'a';
              if (!link.isButton) {
                return (
                  <div key={idx} className="relative group">
                    <NavComponent
                      to={isRouterLink ? link.href : undefined}
                      href={!isRouterLink ? link.href : undefined}
                      className="text-sm font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1 uppercase tracking-wide"
                    >
                      {link.label}
                      {link.type === 'dropdown' ? <ChevronDown className="w-4 h-4 opacity-60" /> : null}
                    </NavComponent>
                    {link.type === 'dropdown' ? (
                      <div className="absolute top-full left-0 w-72 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all z-50">
                        {link.items.map((item, iIdx) => (
                          <a
                            key={iIdx}
                            href={typeof item === 'string' ? '#' : item.href}
                            className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {typeof item === 'string' ? item : item.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }
              return (
                <a
                  key={idx}
                  href={link.href}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-black text-sm uppercase tracking-wide shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {link.label}
                </a>
              );
            })}
          </nav>
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
        {mobileMenuOpen ? (
          <div className="lg:hidden bg-white border-t border-slate-100 shadow-xl">
            {NAV_LINKS.map((link, idx) => (
              <div key={idx} className="border-b border-slate-50">
                {link.type === 'dropdown' ? (
                  <div className="px-4 py-3">
                    <p className="font-bold text-slate-700 mb-2">{link.label}</p>
                    <div className="space-y-2 pl-3">
                      {link.items.map((item, iIdx) => (
                        <a
                          key={iIdx}
                          href={typeof item === 'string' ? '#' : item.href}
                          className="block text-sm text-blue-700 font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {typeof item === 'string' ? item : item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="block px-4 py-3 font-bold text-slate-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : null}
      </header>

      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest mb-3">
            <MapPin className="w-4 h-4" /> Intervention rapide à Verviers et alentours
          </p>
          <h1 className="text-4xl font-black text-slate-900 mb-4">Plomberie & débouchage à Verviers</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Service 24/7 pour vos urgences plomberie, débouchage et chauffage sur Verviers, Herve, Spa et communes voisines.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href={BRAND.phoneLink} className="bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-4 rounded-xl shadow">
              Appeler {BRAND.phoneDisplay}
            </a>
            <Link to="/contact" className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-4 rounded-xl">
              Demande de devis
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}


