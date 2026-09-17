import React from 'react';
import SEO from '../components/SEO';
import { Server, Lock, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Privacy: React.FC = () => {
  const { language } = useLanguage();
  const isFr = language === 'fr';

  return (
    <>
      <SEO 
        title={isFr ? "Politique de Confidentialité & Sécurité Infonuagique | Oakivo Canada atlantique" : "Privacy & Cloud Security Policy | Oakivo Atlantic Canada"}
        description={isFr
          ? "L'engagement d'Oakivo envers la confidentialité des données, les protocoles de sécurité infonuagique, la conformité DevSecOps et la souveraineté des données au Canada atlantique."
          : "Oakivo's commitment to data privacy, cloud security protocols, DevSecOps compliance, and secure process automation workflows across Atlantic Canada."}
        canonical="/privacy"
      />

      <section className="bg-slate-950 text-slate-100 pt-32 pb-24 border-b border-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
             <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-sm mb-8">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                  {isFr ? "Souveraineté des Données" : "Data Sovereignty"}
                </span>
             </div>
             <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
               {isFr ? "Protocole de Confidentialité" : "Privacy Protocol"}
             </h1>
             <p className="text-base md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
               {isFr
                 ? "Oakivo Solutions Inc. accorde la priorité absolue à la souveraineté technique des données de votre organisation. Nos standards reposent sur les principes Zéro Confiance et une stricte résidence des données en sol canadien."
                 : "Oakivo Solutions Inc. prioritizes the technical sovereignty of your organization's data. Our privacy standard is built on Zero-Trust principles and strict Canadian data residency."}
             </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 text-slate-100 py-24">
        <div className="max-w-4xl mx-auto space-y-24 px-6">
           
           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Server size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">
                   {isFr ? "1. Résidence des Données en Sol Canadien" : "1. Canadian Data Residency"}
                 </h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 {isFr ? (
                   <>
                     Contrairement à de nombreuses firmes de conseil multinationales, Oakivo garantit que toutes les données industrielles, dossiers clients et configurations d'infrastructure sont hébergés exclusivement dans des centres de données canadiens vérifiés. Nous nous conformons rigoureusement à la <strong>Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)</strong> et à la <strong>Loi 25 du Québec</strong> comme socle opérationnel.
                   </>
                 ) : (
                   <>
                     Unlike many global consultants, Oakivo ensures that all industrial data, client records, and infrastructure configurations are hosted exclusively within verified Canadian data centers. We adhere strictly to the <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> as the baseline for our operations.
                   </>
                 )}
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <Lock size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">
                   {isFr ? "2. Mesures de Protection Techniques" : "2. Technical Safeguards"}
                 </h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 {isFr
                   ? "Toutes les données en transit sont protégées par chiffrement TLS 1.3. Les données au repos sont sécurisées via un chiffrement AES 256 bits. Nous déployons systématiquement l'authentification multifacteur (MFA) et la gestion des identités Zéro Confiance sur chaque mandat."
                   : "All data in transit is protected by TLS 1.3 encryption. Data at rest is secured via AES-256-bit encryption. We implement Multi-Factor Authentication (MFA) and Zero-Trust identity management as standard across every implementation."}
              </p>
           </div>

           <div className="space-y-8">
              <div className="flex items-center gap-6 mb-8">
                 <div className="w-16 h-16 bg-cyan-500/10 rounded-sm flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                    <EyeOff size={32} />
                 </div>
                 <h2 className="text-3xl font-display font-bold">
                   {isFr ? "3. Utilisation des Données & Télémétrie" : "3. Data Usage & Telemetry"}
                 </h2>
              </div>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-light">
                 {isFr ? (
                   <>
                     Oakivo Solutions Inc. <strong>n'utilise jamais les données industrielles de ses clients</strong> pour alimenter de la télémétrie dans des systèmes publics ou des modèles d'IA tiers. Tout flux de travail automatisé développé pour votre organisation demeure votre propriété intellectuelle exclusive et reste isolé dans votre environnement sécurisé.
                   </>
                 ) : (
                   <>
                     Oakivo Solutions Inc. <strong>does not use client industrial data</strong> to feed telemetry into public systems. Any automated workflows developed for your organization remain your intellectual property and are isolated within your secure environment.
                   </>
                 )}
              </p>
           </div>

           <div className="pt-16 border-t border-slate-900/50 text-center">
              <p className="text-xs text-slate-500 font-mono font-bold uppercase tracking-widest mb-8">
                {isFr ? "Document Officiel de Gouvernance v2.4 (2026)" : "Official Governance Document v2.4 (2026)"}
              </p>
           </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
