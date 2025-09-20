"use client";

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { SystemStatusCard } from '@/components/dashboard/SystemStatusCard';
import { EventsTable } from '@/components/dashboard/EventsTable';
import { IncidentsList } from '@/components/dashboard/IncidentsList';
import { ActionsBar } from '@/components/dashboard/ActionsBar';
import { useSidebar } from '@/context/SidebarContext';
import { mockKpiData, mockSystemServices, mockEvents, mockIncidents, mockNotifications } from '@/data/mockData';
import { NotificationItem } from '@/types/dashboard';
import { Shield, AlertTriangle, Server } from 'lucide-react';

/**
 * Security Operations Dashboard
 * 
 * This dashboard displays real-time security metrics, system status, events, and incidents.
 * All components accept props and can be easily connected to real APIs.
 * 
 * Props Structure:
 * - KpiCard: { label, value, delta?, trend?, icon?, isLoading?, isError? }
 * - SystemStatusCard: { services, isLoading?, isError? }
 * - EventsTable: { events, onExport?, isLoading?, isError? }
 * - IncidentsList: { incidents, isLoading?, isError? }
 * 
 * To connect to real data:
 * 1. Replace mock data imports with API calls
 * 2. Add loading states using React Query or SWR
 * 3. Implement error handling and retry logic
 * 4. Add real-time updates using WebSockets or Server-Sent Events
 */

export default function DashboardPage() {
  const { isExpanded } = useSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const [notifications] = useState<NotificationItem[]>(mockNotifications);

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality
  };

  const handleNotificationClick = (notification: NotificationItem) => {
    console.log('Notification clicked:', notification);
    // Implement notification handling
  };

  const handleUserAction = (action: string) => {
    console.log('User action:', action);
    // Implement user actions
  };

  const handleLockdown = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('System lockdown initiated');
    setIsLoading(false);
  };

  const handleGenerateReport = () => {
    console.log('Generating report...');
    // Implement report generation
  };

  const handleSystemSettings = () => {
    console.log('Opening system settings...');
    // Implement settings navigation
  };

  const handleExportEvents = () => {
    console.log('Exporting events...');
    // Implement event export
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          isExpanded ? 'ml-0' : 'ml-0'
        }`}>
          {/* Header */}
          <Header
            notifications={notifications}
            onSearch={handleSearch}
            onNotificationClick={handleNotificationClick}
            onUserAction={handleUserAction}
          />
          
          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Security Operations Dashboard</h1>
                <p className="text-muted-foreground">
                  Real-time threat monitoring and incident response
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <KpiCard 
                  {...mockKpiData[0]} 
                  icon={<Server className="h-6 w-6 text-blue-600" />} 
                />
                <KpiCard 
                  {...mockKpiData[1]} 
                  icon={<AlertTriangle className="h-6 w-6 text-red-600" />} 
                />
                <KpiCard 
                  {...mockKpiData[2]} 
                  icon={<Shield className="h-6 w-6 text-yellow-600" />} 
                />
              </div>

              {/* Main Grid */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* System Status */}
                <SystemStatusCard services={mockSystemServices} />
                
                {/* Incidents */}
                <IncidentsList incidents={mockIncidents} />
              </div>

              {/* Events Table */}
              <EventsTable 
                events={mockEvents} 
                onExport={handleExportEvents}
              />
            </div>
          </main>

          {/* Actions Bar */}
          <ActionsBar
            onLockdown={handleLockdown}
            onGenerateReport={handleGenerateReport}
            onSystemSettings={handleSystemSettings}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
