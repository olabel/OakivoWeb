const fs = require('fs');
let content = fs.readFileSync('pages/Careers.tsx', 'utf8');

if (!content.includes('import { toast } from "sonner";')) {
  content = content.replace(
    "import SEO from '../components/SEO';",
    "import SEO from '../components/SEO';\nimport { toast } from 'sonner';"
  );
  
  const handleTarget = `setStatus('success');
      setFormState({ name: '', email: '', linkedin: '', message: '' });
    } catch (err) {
      console.error("Applicant capture error:", err);
      setStatus('error');
    }`;

  const handleReplace = `setStatus('success');
      setFormState({ name: '', email: '', linkedin: '', message: '' });
      toast.success('Application Submitted', { description: 'Our technical recruiting team will review your profile.' });
    } catch (err) {
      console.error("Applicant capture error:", err);
      setStatus('error');
      toast.error('Submission Failed', { description: 'Please try again.' });
    }`;
    
  content = content.replace(handleTarget, handleReplace);
  fs.writeFileSync('pages/Careers.tsx', content);
}
