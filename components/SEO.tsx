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
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  schema, 
  type = 'website',
  keywords,
  image = '/og-image.png'
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
    'description': 'Elite DevSecOps automation, autonomous infrastructure design, and zero-trust cloud security for Atlantic Canadian enterprises.',
    'address': {
      '@type': 'PostalAddress',
      'addressRegion': 'Atlantic Canada',
      'addressCountry': 'CA'
    },
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'New Brunswick' },
      { '@type': 'AdministrativeArea', 'name': 'Nova Scotia' },
      { '@type': 'AdministrativeArea', 'name': 'Prince Edward Island' },
      { '@type': 'AdministrativeArea', 'name': 'Newfoundland and Labrador' }
    ],
    'serviceType': [
      'DevSecOps Automation',
      'Cloud Security Posture Management (CSPM)',
      'Zero-Trust Architecture',
      'CI/CD Pipeline Security',
      'Site Reliability Engineering (SRE)'
    ],
    'priceRange': '$$$',
    'knowsAbout': [
      'DevSecOps',
      'Cloud Security',
      'Infrastructure as Code (IaC)',
      'Kubernetes Security',
      'Compliance Automation',
      'Zero-Trust',
      'SOC 2',
      'PIPEDA',
      'ISO 27001'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Oakivo Solutions',
    'url': siteUrl,
    'description': 'Premium DevSecOps & Cloud Security for Atlantic Canadian enterprises.',
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
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Multi-language Hreflang Tags */}
      <link rel="alternate" hreflang="en-CA" href={fullUrl} />
      <link rel="alternate" hreflang="fr-CA" href={`${fullUrl}?lang=fr`} />
      <link rel="alternate" hreflang="x-default" href={fullUrl} />
      
      {/* Advanced Robot Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Oakivo Solutions" />
      <meta property="og:locale" content={language === 'fr' ? 'fr_CA' : 'en_CA'} />
      <meta property="og:locale:alternate" content={language === 'fr' ? 'en_CA' : 'fr_CA'} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Structured Data (JSON-LD) */}
      {renderSchema()}
    </Helmet>
  );
};

export default SEO;
