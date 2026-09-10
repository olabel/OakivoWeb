const fs = require('fs');
let content = fs.readFileSync('pages/Booking.tsx', 'utf8');

if (!content.includes('import { toast } from "sonner";')) {
  content = content.replace(
    "import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from 'lucide-react';",
    "import { Calendar as CalendarIcon, Clock, ArrowRight, CheckCircle2, ShieldCheck, Mail, MapPin } from 'lucide-react';\nimport { toast } from 'sonner';"
  );
  
  const handleTarget = `setStatus('success');
    } catch (err) {`;

  const handleReplace = `setStatus('success');
      toast.success('Consultation Booked', { description: 'An architect will confirm your time slot shortly.' });
    } catch (err) {`;
      
  const catchTarget = `setErrorMessage('A network error occurred. Please try again or email us directly.');
    } finally {`;
    
  const catchReplace = `setErrorMessage('A network error occurred. Please try again or email us directly.');
      toast.error('Booking Failed', { description: 'Please try again or email us directly.' });
    } finally {`;
    
  content = content.replace(handleTarget, handleReplace).replace(catchTarget, catchReplace);
  fs.writeFileSync('pages/Booking.tsx', content);
}
