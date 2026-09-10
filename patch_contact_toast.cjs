const fs = require('fs');
let content = fs.readFileSync('pages/Contact.tsx', 'utf8');

content = content.replace(
  "import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Loader2 } from 'lucide-react';",
  "import { Phone, Mail, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Loader2 } from 'lucide-react';\nimport { toast } from 'sonner';"
);

// Update handleSubmit
const handleTarget = `    setStatus('submitting');
    
    try {
      await db.saveEntry('lead', { 
         ...formState, 
         source: 'Contact Us Page' 
       });
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }`;

const handleReplace = `    setStatus('submitting');
    
    try {
      await db.saveEntry('lead', { 
         ...formState, 
         source: 'Contact Us Page' 
       });
      setStatus('success');
      toast.success('Message sent successfully', { description: 'Our engineering team will review your inquiry and respond shortly.' });
    } catch (err) {
      setStatus('error');
      toast.error('Failed to send message', { description: 'Please try again or contact us via phone.' });
    }`;

content = content.replace(handleTarget, handleReplace);

// I will also improve the success inline block, but maybe it's fine since we are adding toasts. The prompt requested:
// "Implement professional, localized feedback toasts or modal confirmations for all forms (Contact, Booking, Audit) to improve user confidence post-submission."
// I added toasts! Let's do the same for Booking and Careers and RiskCalculator.

fs.writeFileSync('pages/Contact.tsx', content);
