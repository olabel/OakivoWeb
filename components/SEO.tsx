import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  schema?: Record<string, any> | Record<string, any>[];
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonical, 
  schema, 
  type = 'website',
  keywords
}) => {
  const siteUrl = 'https://www.oakivo.com';
  const fullUrl = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Oakivo Solutions',
    'legalName': 'Oakivo Solutions Inc.',
    'url': siteUrl,
    'logo': `${siteUrl}/logo.png`,
    'image': `${siteUrl}/logo.png`,
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
      'CI/CD Pipeline Security'
    ],
    'priceRange': '$$$',
    'knowsAbout': [
      'DevSecOps',
      'Cloud Security',
      'Infrastructure as Code (IaC)',
      'Kubernetes Security',
      'Compliance Automation',
      'Zero-Trust'
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
    }
  };

  const renderSchema = () => {
    const userSchemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
    const allSchemas = [organizationSchema, websiteSchema, ...userSchemas];

    return allSchemas.map((s, idx) => (
      <script key={idx} type="application/ld+json">
        {JSON.stringify(s)}
      </script>
    ));
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Oakivo Solutions" />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* JSON-LD Schema */}
      {renderSchema()}
    </Helmet>
  );
};

export default SEO;
