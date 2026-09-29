import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: Record<string, any> | Record<string, any>[];
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  schema, 
  type = 'website',
  keywords,
  image = '/og-image.png',
  imageAlt,
  noindex = false
}) => {
  const { language } = useLanguage();
  const siteUrl = 'https://www.oakivo.com';
  const location = useLocation();
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const fullUrl = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : `${siteUrl}${currentPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Oakivo Solutions',
    'legalName': 'Oakivo Solutions Inc.',
    'url': siteUrl,
    'logo': `${siteUrl}/logo.png`,
    'image': fullImageUrl,
    'description': 'Modern ERP implementations, hands-free business workflow automations, and enterprise cloud cybersecurity for growing Canadian businesses.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dieppe',
      'addressRegion': 'New Brunswick',
      'addressCountry': 'CA'
    },
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'New Brunswick' },
      { '@type': 'AdministrativeArea', 'name': 'Nova Scotia' },
      { '@type': 'AdministrativeArea', 'name': 'Prince Edward Island' },
      { '@type': 'AdministrativeArea', 'name': 'Newfoundland and Labrador' }
    ],
    'serviceType': [
      'Modern ERP Implementation & Operations',
      'Business Workflow & Revenue Automation',
      'Cloud Architecture & DevSecOps Modernization',
      'Enterprise Cybersecurity & Zero-Trust Architecture',
      'Continuous Compliance Automation (SOC 2, PIPEDA, Law 25)'
    ],
    'priceRange': '$$$',
    'knowsAbout': [
      'Modern ERP',
      'Workflow Automation',
      'Enterprise Cybersecurity',
      'Cloud Architecture',
      'DevSecOps',
      'Zero-Trust Architecture',
      'Compliance Automation',
      'SOC 2 Type II',
      'PIPEDA',
      'Law 25',
      'Canadian Data Sovereignty'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Oakivo Solutions',
    'url': siteUrl,
    'description': 'Modern ERP, business workflow automation, and enterprise cloud cybersecurity for growing Canadian businesses.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Oakivo Solutions'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Generate dynamic breadcrumb schema based on current path
  const pathParts = currentPath.split('/').filter(Boolean);
  const breadcrumbSchema = pathParts.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteUrl
      },
      ...pathParts.map((part, index) => ({
        '@type': 'ListItem',
        'position': index + 2,
        'name': part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
        'item': `${siteUrl}/${pathParts.slice(0, index + 1).join('/')}`
      }))
    ]
  } : null;

  const renderSchema = () => {
    const userSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
    const allSchemas: any[] = [organizationSchema, websiteSchema];
    if (breadcrumbSchema) allSchemas.push(breadcrumbSchema);
    allSchemas.push(...userSchemas);

    return allSchemas.map((s, idx) => (
      <script key={idx} type="application/ld+json">
        {JSON.stringify(s)}
      </script>
    ));
  };

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && !noindex && <meta name="keywords" content={keywords} />}
      {!noindex && <link rel="canonical" href={fullUrl} />}
      
      {/* Multi-language Hreflang Tags */}
      {!noindex && (
        <>
          <link rel="alternate" hrefLang="en-CA" href={fullUrl} />
          <link rel="alternate" hrefLang="fr-CA" href={`${fullUrl}?lang=fr`} />
          <link rel="alternate" hrefLang="x-default" href={fullUrl} />
        </>
      )}
      
      {/* Advanced Robot Directives */}
      {noindex ? (
        <>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="googlebot" content="noindex, nofollow" />
        </>
      ) : (
        <>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        </>
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      {!noindex && <meta property="og:url" content={fullUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Oakivo Solutions" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_CA' : 'en_CA'} />
      <meta property="og:locale:alternate" content={language === 'fr' ? 'en_CA' : 'fr_CA'} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt || title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {!noindex && <meta name="twitter:url" content={fullUrl} />}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt || title} />
      <meta name="twitter:site" content="@oakivosolutions" />
      <meta name="twitter:creator" content="@oakivosolutions" />

      {/* Structured Data (JSON-LD) */}
      {!noindex && renderSchema()}
    </Helmet>
  );
};

export default SEO;
