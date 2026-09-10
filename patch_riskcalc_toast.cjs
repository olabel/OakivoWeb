const fs = require('fs');
let content = fs.readFileSync('pages/RiskCalculator.tsx', 'utf8');

if (!content.includes('import { toast } from "sonner";')) {
  content = content.replace(
    "import { ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, Activity, Lock, RefreshCw, Server, Send } from 'lucide-react';",
    "import { ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, Activity, Lock, RefreshCw, Server, Send } from 'lucide-react';\nimport { toast } from 'sonner';"
  );
  
  const handleTarget = `setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);`;

  const handleReplace = `setIsSubmitted(true);
      toast.success('Audit Request Sent', { description: 'Our security team will review your risk profile.' });
    } catch (err) {
      console.error(err);
      toast.error('Submission Failed', { description: 'Please try again.' });
    } finally {
      setIsSubmitting(false);`;
      
  content = content.replace(handleTarget, handleReplace);
  fs.writeFileSync('pages/RiskCalculator.tsx', content);
}
