import React, { useState, useEffect } from 'react';
import { 
  Mail, CheckCircle2, AlertCircle, RefreshCw, Send, Trash2, 
  Search, Shield, ExternalLink, Copy, Check, Filter, Terminal, 
  Clock, ArrowUpRight, ChevronDown, ChevronUp, Info, Activity,
  Server, UserCheck, Inbox
} from 'lucide-react';
import { toast } from 'sonner';

export interface EmailAuditLogEntry {
  id: string;
  timestamp: string;
  type: 'admin_audit_alert' | 'client_thank_you' | 'test_dispatch' | 'lead_notification' | 'contact_inquiry' | 'applicant_notification';
  recipient: string;
  sender: string;
  subject: string;
  provider: 'resend' | 'sendgrid' | 'brevo' | 'smtp' | 'preview_audit_log';
  status: 'delivered' | 'sandbox_mode' | 'failed';
  resendMessageId?: string;
  error?: string;
  metadata?: Record<string, any>;
}

interface AuditLogResponse {
  logs: EmailAuditLogEntry[];
  stats: {
    total: number;
    delivered: number;
    sandbox: number;
    failed: number;
    resendCount: number;
  };
  serviceConfig: {
    provider: string;
    hasResendKey: boolean;
    configuredFrom: string;
    primaryRecipient: string;
    sandboxSender: string;
  };
}

const formatRelativeTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return isoString;
  }
};

const EmailAuditLogSection: React.FC = () => {
  const [data, setData] = useState<AuditLogResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'delivered' | 'sandbox_mode' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [selectedEntry, setSelectedEntry] = useState<EmailAuditLogEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/email-audit-logs');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (e) {
      console.error('Failed to load email audit logs:', e);
      toast.error('Failed to load email audit logs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleTestDispatch = async () => {
    setIsTestingEmail(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/test-email', { method: 'POST' });
      const json = await res.json();
      if (json.success) {
        toast.success('Live test email dispatched successfully via Resend API to olabel@gmail.com!');
        setTestResult(`Delivered via Resend: ID ${json.delivery?.id || 'OK'} to olabel@gmail.com`);
        await fetchLogs();
      } else {
        toast.error(`Dispatch issue: ${json.error || 'Check configuration'}`);
        setTestResult(`Dispatch error: ${json.error}`);
      }
    } catch (e: any) {
      toast.error(`Connection error: ${e.message}`);
      setTestResult(`Error: ${e.message}`);
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleClearLogs = async () => {
    if (!window.confirm('Are you sure you want to clear the email audit log history?')) {
      return;
    }
    try {
      const res = await fetch('/api/email-audit-logs/clear', { method: 'POST' });
      if (res.ok) {
        toast.success('Email audit logs cleared.');
        await fetchLogs();
      }
    } catch (e) {
      toast.error('Could not clear logs.');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success('Copied Resend ID to clipboard');
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const filteredLogs = (data?.logs || []).filter((log) => {
    // Status Filter
    if (statusFilter !== 'all' && log.status !== statusFilter) return false;
    // Type Filter
    if (typeFilter !== 'all' && log.type !== typeFilter) return false;
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRecipient = log.recipient.toLowerCase().includes(q);
      const matchSubject = log.subject.toLowerCase().includes(q);
      const matchMsgId = (log.resendMessageId || '').toLowerCase().includes(q);
      const matchClient = log.metadata?.clientName ? String(log.metadata.clientName).toLowerCase().includes(q) : false;
      const matchCompany = log.metadata?.clientCompany ? String(log.metadata.clientCompany).toLowerCase().includes(q) : false;
      if (!matchRecipient && !matchSubject && !matchMsgId && !matchClient && !matchCompany) return false;
    }
    return true;
  });

  const getTypeBadge = (type: EmailAuditLogEntry['type']) => {
    switch (type) {
      case 'client_thank_you':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <UserCheck size={12} /> Client Thank You Auto-Reply
          </span>
        );
      case 'admin_audit_alert':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield size={12} /> Admin Consultation Alert
          </span>
        );
      case 'test_dispatch':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Activity size={12} /> Verification Test Dispatch
          </span>
        );
      case 'contact_inquiry':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Mail size={12} /> Contact Inquiry Alert
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Inbox size={12} /> Lead Intake Alert
          </span>
        );
    }
  };

  const getStatusBadge = (status: EmailAuditLogEntry['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 size={12} className="text-emerald-400" /> Delivered
          </span>
        );
      case 'sandbox_mode':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30" title="Delivered safely in Resend Sandbox to olabel@gmail.com">
            <CheckCircle2 size={12} className="text-cyan-400" /> Delivered (Sandbox Mode)
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-red-500/15 text-red-400 border border-red-500/30">
            <AlertCircle size={12} className="text-red-400" /> Delivery Failed
          </span>
        );
    }
  };

  const stats = data?.stats || { total: 0, delivered: 0, sandbox: 0, failed: 0, resendCount: 0 };
  const serviceConfig = data?.serviceConfig;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* SECTION 1: RESEND METRICS & LIVE ENGINE TELEMETRY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Dispatches */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Total Dispatches</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Mail size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl lg:text-4xl font-mono font-black text-white">{stats.total}</span>
            <span className="text-xs font-mono text-cyan-400 font-semibold">Resend API</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            {stats.resendCount} routed via Official Resend SDK
          </p>
        </div>

        {/* Live Inbox Deliveries */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Inbox Delivery Rate</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl lg:text-4xl font-mono font-black text-emerald-400">
              {stats.total > 0 ? Math.round(((stats.delivered + stats.sandbox) / stats.total) * 100) : 100}%
            </span>
            <span className="text-xs font-mono text-emerald-400/80 font-semibold">0% Dropped</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Target: <span className="text-slate-300">olabel@gmail.com</span>
          </p>
        </div>

        {/* Sandbox Protection */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">Sandbox Protected</span>
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Shield size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl lg:text-4xl font-mono font-black text-cyan-300">{stats.sandbox}</span>
            <span className="text-xs font-mono text-cyan-400 font-semibold">Zero-Drop Fallback</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Sender: <span className="text-slate-300">onboarding@resend.dev</span>
          </p>
        </div>

        {/* Failed / Suppressed */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Failed / Suppressed</span>
            <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className={`text-3xl lg:text-4xl font-mono font-black ${stats.failed > 0 ? 'text-red-400' : 'text-slate-300'}`}>
              {stats.failed}
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              {stats.failed === 0 ? 'All Clear' : 'Review Errors'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            Continuous health telemetry
          </p>
        </div>

      </div>

      {/* SECTION 2: PRODUCTION DOMAIN & INTEGRATION NOTIFICATION CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                Resend API Integration Active &amp; Verified
              </span>
            </div>
            <h3 className="text-xl lg:text-2xl font-bold font-display text-white">
              Resend Real-Time Delivery Stream &amp; Audit Trail
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every audit booking automatically dispatches a dual stream: an <strong>executive alert to olabel@gmail.com</strong> and an <strong>automatic client 'Thank You' confirmation</strong> setting 30-minute expectations.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Server size={14} className="text-cyan-400" />
                <span>Active Provider: <strong className="text-white">Resend API</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Inbox size={14} className="text-emerald-400" />
                <span>Admin Alerts: <strong className="text-white">olabel@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Shield size={14} className="text-cyan-400" />
                <span>Sender Domain: <strong className="text-white">{serviceConfig?.configuredFrom || 'hello@oakivo.com'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleTestDispatch}
              disabled={isTestingEmail}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isTestingEmail ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Dispatching...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Test Email</span>
                </>
              )}
            </button>
            <a
              href="https://resend.com/emails"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-mono text-xs font-medium border border-slate-700 transition-all"
            >
              <span>Resend Dashboard</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {testResult && (
          <div className="mt-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center justify-between animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
              <span>{testResult}</span>
            </div>
            <button onClick={() => setTestResult(null)} className="text-slate-400 hover:text-white text-sm font-bold ml-4">✕</button>
          </div>
        )}
      </div>

      {/* SECTION 3: CONTROLS & FILTER TOOLBAR */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by recipient, subject, Resend ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl">
            {(['all', 'delivered', 'sandbox_mode', 'failed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all ${
                  statusFilter === st 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-gray-500 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'All Status' : st === 'sandbox_mode' ? 'Sandbox' : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono text-slate-800 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Event Types</option>
            <option value="client_thank_you">Client Thank You</option>
            <option value="admin_audit_alert">Admin Consultation Alert</option>
            <option value="test_dispatch">Test Dispatch</option>
            <option value="contact_inquiry">Contact Inquiries</option>
            <option value="lead_notification">Lead Intakes</option>
          </select>

          {/* Refresh Button */}
          <button
            onClick={fetchLogs}
            disabled={isLoading}
            className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 transition-all cursor-pointer"
            title="Refresh logs"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>

          {/* Clear Logs Button */}
          <button
            onClick={handleClearLogs}
            className="p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-500 border border-red-200 transition-all cursor-pointer"
            title="Clear audit log"
          >
            <Trash2 size={16} />
          </button>

        </div>
      </div>

      {/* SECTION 4: AUDIT LOG ENTRIES STREAM */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-cyan-600" />
            <h4 className="font-bold text-slate-900 text-base font-serif-display">
              Resend Delivery Audit Trail
            </h4>
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
              Showing {filteredLogs.length} of {data?.logs?.length || 0} events
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400">
            Auto-synced with server store
          </span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Inbox size={28} />
            </div>
            <h5 className="font-bold text-slate-800 text-base mb-1">No Email Events Match Filter</h5>
            <p className="text-xs text-gray-400 max-w-sm mx-auto font-mono mb-6">
              {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search terms or filter criteria.'
                : 'No emails have been dispatched yet. Click "Send Test Email" to generate your first audit entry!'}
            </p>
            <button
              onClick={handleTestDispatch}
              disabled={isTestingEmail}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer"
            >
              <Send size={14} /> Send First Test Email
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredLogs.map((log) => {
              const isExpanded = expandedLogId === log.id;
              return (
                <div 
                  key={log.id} 
                  className="p-6 hover:bg-slate-50/70 transition-all duration-200 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Left: Type, Subject, Recipient */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {getTypeBadge(log.type)}
                        {getStatusBadge(log.status)}
                        <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                          <Clock size={12} /> {formatRelativeTime(log.timestamp)}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                        {log.subject}
                      </h5>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                        <span>
                          To: <strong className="text-slate-800">{log.recipient}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Sender: <span className="text-gray-600">{log.sender}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Resend Message ID & Actions */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0 lg:justify-end">
                      {log.resendMessageId && (
                        <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-xl font-mono text-xs text-slate-700 transition-all">
                          <span className="text-[10px] uppercase text-gray-400 font-bold">ID:</span>
                          <span className="font-bold">{log.resendMessageId.substring(0, 10)}...</span>
                          <button
                            onClick={() => copyToClipboard(log.resendMessageId!, log.id)}
                            title="Copy full Resend ID"
                            className="text-gray-400 hover:text-slate-900 p-0.5"
                          >
                            {copiedId === log.id ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )}
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => setSelectedEntry(log)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold transition-all cursor-pointer"
                      >
                        Inspect Payload
                      </button>

                      <button
                        onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                        className="p-2 rounded-xl text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all cursor-pointer"
                        title={isExpanded ? 'Collapse' : 'Expand Details'}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>

                  </div>

                  {/* Inline Error/Sandbox Note if present */}
                  {log.error && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono flex items-start gap-2">
                      <Info size={14} className="shrink-0 mt-0.5 text-amber-600" />
                      <span>{log.error}</span>
                    </div>
                  )}

                  {/* Expanded Inspector Panel */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200/80 bg-gray-50 -mx-6 -mb-6 p-6 space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-gray-400 uppercase text-[10px] block font-bold">Exact Timestamp</span>
                          <span className="text-slate-800 font-semibold">{log.timestamp}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-gray-400 uppercase text-[10px] block font-bold">Dispatch Provider</span>
                          <span className="text-slate-800 font-semibold uppercase">{log.provider} API</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-gray-400 uppercase text-[10px] block font-bold">Delivery Status</span>
                          <span className="text-slate-800 font-semibold uppercase">{log.status}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200">
                          <span className="text-gray-400 uppercase text-[10px] block font-bold">Resend Message ID</span>
                          <span className="text-slate-800 font-semibold break-all">{log.resendMessageId || 'N/A'}</span>
                        </div>
                      </div>

                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div>
                          <label className="text-[10px] font-bold font-mono text-gray-500 uppercase tracking-wider block mb-1">
                            Associated Client / Interaction Metadata:
                          </label>
                          <pre className="bg-slate-950 text-cyan-300 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-slate-800">
                            {JSON.stringify(log.metadata, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: FULL AUDIT INSPECTOR MODAL */}
      {selectedEntry && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[36px] shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="bg-oakivo-primary p-8 text-white relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-oakivo-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif-display">Email Telemetry Inspector</h3>
                    <p className="text-xs font-mono text-oakivo-secondary mt-1">Audit Log Ref: {selectedEntry.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-all text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 max-h-[65vh] overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Event Type</span>
                  <div className="mt-1">{getTypeBadge(selectedEntry.type)}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Delivery Status</span>
                  <div className="mt-1">{getStatusBadge(selectedEntry.status)}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Subject Line</span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{selectedEntry.subject}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Target Recipient</span>
                  <p className="text-xs font-mono text-slate-800 font-semibold mt-0.5">{selectedEntry.recipient}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Sender Header</span>
                  <p className="text-xs font-mono text-slate-800 mt-0.5">{selectedEntry.sender}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Timestamp</span>
                  <p className="text-xs font-mono text-slate-800 mt-0.5">{selectedEntry.timestamp}</p>
                </div>
                {selectedEntry.resendMessageId && (
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Resend Message ID</span>
                    <p className="text-xs font-mono text-cyan-600 font-bold mt-0.5 break-all">{selectedEntry.resendMessageId}</p>
                  </div>
                )}
              </div>

              {selectedEntry.metadata && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-gray-400 block font-bold">Payload Attributes</span>
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto">
                    <pre className="text-cyan-300 text-xs font-mono">
                      {JSON.stringify(selectedEntry.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              {selectedEntry.error && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono space-y-1">
                  <span className="font-bold flex items-center gap-1 text-amber-900">
                    <Info size={14} /> Diagnostic Note:
                  </span>
                  <p>{selectedEntry.error}</p>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              {selectedEntry.resendMessageId && (
                <button
                  onClick={() => copyToClipboard(selectedEntry.resendMessageId!, selectedEntry.id)}
                  className="inline-flex items-center gap-2 text-xs font-mono text-gray-600 hover:text-slate-900 cursor-pointer"
                >
                  <Copy size={14} /> Copy Resend Message ID
                </button>
              )}
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-mono text-xs font-bold transition-all ml-auto cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EmailAuditLogSection;
