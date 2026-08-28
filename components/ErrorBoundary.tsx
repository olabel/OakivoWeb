import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Mail } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const subject = encodeURIComponent("Runtime Error in Oakivo Application");
      const body = encodeURIComponent(`I encountered the following error:\n\n${this.state.error?.message}\n\nPlease assist.`);
      
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100 font-sans relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 max-w-lg w-full bg-slate-900/40 backdrop-blur-md rounded-sm border border-slate-800 shadow-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
              <ShieldAlert size={32} />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4">
              System Exception
            </h1>
            
            <p className="text-slate-400 font-light leading-relaxed mb-8">
              A runtime error occurred within the application boundary. Our engineering team monitors these exceptions, but you can securely report this directly to our support engineers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-3 rounded-sm bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} /> Restart Session
              </button>
              
              <a 
                href={`mailto:ahmed.bello@oakivo.com?subject=${subject}&body=${body}`}
                className="w-full sm:w-auto px-6 py-3 rounded-sm bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-widest border border-slate-700/50 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Mail size={14} /> Contact Support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
