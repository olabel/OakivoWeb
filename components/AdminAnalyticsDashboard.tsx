import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { PageViewEvent } from '../utils/analytics';
import { Globe, Users, Monitor } from 'lucide-react';

interface AdminAnalyticsDashboardProps {
  events: PageViewEvent[];
}

const COLORS = ['#0ea5e9', '#10b981', '#6366f1', '#f59e0b', '#8b5cf6'];

const AdminAnalyticsDashboard: React.FC<AdminAnalyticsDashboardProps> = ({ events }) => {
  // Aggregate data for Visitor Growth (Line Chart) over the last 7 days (or based on available events)
  const growthDataMap = new Map<string, number>();
  
  // Create a 7-day trailing window just in case
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    growthDataMap.set(d.toLocaleDateString(), 0);
  }

  events.forEach(ev => {
    const date = new Date(ev.timestamp).toLocaleDateString();
    if (growthDataMap.has(date)) {
      growthDataMap.set(date, (growthDataMap.get(date) || 0) + 1);
    } else {
      growthDataMap.set(date, 1);
    }
  });

  const growthData = Array.from(growthDataMap.entries())
    .map(([date, visitors]) => ({ date, visitors }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Interaction Patterns - Page Views (Bar Chart)
  const pageMap = new Map<string, number>();
  events.forEach(ev => {
    pageMap.set(ev.path, (pageMap.get(ev.path) || 0) + 1);
  });

  const pageData = Array.from(pageMap.entries())
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  // Device Data - Pie Chart
  const deviceMap = new Map<string, number>();
  events.forEach(ev => {
    deviceMap.set(ev.device, (deviceMap.get(ev.device) || 0) + 1);
  });

  const deviceData = Array.from(deviceMap.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-8 mt-8">
      {/* 1. Visitor Growth Line Chart */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 text-oakivo-primary font-serif-display font-bold text-lg mb-6">
          <Users size={20} className="text-cyan-500" />
          Visitor Growth (Last 7 Days)
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="visitors" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, fill: '#0ea5e9' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 2. Page View Interactions Bar Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-oakivo-primary font-serif-display font-bold text-lg mb-6">
            <Globe size={20} className="text-emerald-500" />
            Top Interaction Paths
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pageData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="path" type="category" stroke="#64748b" fontSize={10} width={100} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="views" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Device Distribution Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-oakivo-primary font-serif-display font-bold text-lg mb-6">
            <Monitor size={20} className="text-indigo-500" />
            Visitor Device Telemetry
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsDashboard;
