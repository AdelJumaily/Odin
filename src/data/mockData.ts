import { KpiCard, SystemService, EventRow, IncidentItem, NotificationItem } from '@/types/dashboard';

export const mockKpiData: Omit<KpiCard, 'icon'>[] = [
  {
    label: 'Total Devices',
    value: '1,247',
    delta: 12,
    trend: 'up'
  },
  {
    label: 'Active Incidents',
    value: '23',
    delta: 5,
    trend: 'up'
  },
  {
    label: 'Threat Score',
    value: 'Medium',
    delta: 0,
    trend: 'neutral'
  }
];

export const mockSystemServices: SystemService[] = [
  {
    id: '1',
    name: 'Threat Detection Engine',
    status: 'operational',
    uptime: 99.9,
    lastCheck: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Event Processing',
    status: 'operational',
    uptime: 99.7,
    lastCheck: '1 minute ago'
  },
  {
    id: '3',
    name: 'Database Cluster',
    status: 'operational',
    uptime: 100,
    lastCheck: '30 seconds ago'
  },
  {
    id: '4',
    name: 'API Gateway',
    status: 'degraded',
    uptime: 95.2,
    lastCheck: '5 minutes ago'
  },
  {
    id: '5',
    name: 'Notification Service',
    status: 'operational',
    uptime: 99.5,
    lastCheck: '1 minute ago'
  }
];

export const mockEvents: EventRow[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'Suspicious network activity detected',
    source: 'Network Monitor',
    device: 'server-01',
    timestamp: '2024-12-15T10:30:00Z',
    description: 'Unusual traffic patterns detected from external IP'
  },
  {
    id: '2',
    severity: 'high',
    title: 'Failed login attempt from unknown IP',
    source: 'Auth System',
    device: 'auth-server-02',
    timestamp: '2024-12-15T10:25:00Z',
    description: 'Multiple failed login attempts from 192.168.1.100'
  },
  {
    id: '3',
    severity: 'medium',
    title: 'System update completed',
    source: 'Update Manager',
    device: 'server-03',
    timestamp: '2024-12-15T10:20:00Z',
    description: 'Security patches applied successfully'
  },
  {
    id: '4',
    severity: 'low',
    title: 'Malware signature updated',
    source: 'Antivirus',
    device: 'workstation-15',
    timestamp: '2024-12-15T10:15:00Z',
    description: 'Virus definitions updated to latest version'
  },
  {
    id: '5',
    severity: 'high',
    title: 'DDoS attack blocked',
    source: 'Firewall',
    device: 'firewall-01',
    timestamp: '2024-12-15T10:10:00Z',
    description: 'Blocked 10,000+ requests from suspicious IPs'
  },
  {
    id: '6',
    severity: 'medium',
    title: 'Certificate expires soon',
    source: 'SSL Monitor',
    device: 'web-server-01',
    timestamp: '2024-12-15T10:05:00Z',
    description: 'SSL certificate expires in 7 days'
  }
];

export const mockIncidents: IncidentItem[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'Data breach attempt detected',
    device: 'database-server-01',
    createdAt: '2024-12-15T09:45:00Z',
    status: 'open',
    description: 'Unauthorized access attempt to customer database',
    assignee: 'John Smith'
  },
  {
    id: '2',
    severity: 'high',
    title: 'Ransomware detected on workstation',
    device: 'workstation-42',
    createdAt: '2024-12-15T09:30:00Z',
    status: 'acknowledged',
    description: 'Malicious software detected and quarantined',
    assignee: 'Sarah Johnson'
  },
  {
    id: '3',
    severity: 'medium',
    title: 'Suspicious file upload',
    device: 'web-server-02',
    createdAt: '2024-12-15T09:15:00Z',
    status: 'open',
    description: 'Potentially malicious file uploaded to web server'
  },
  {
    id: '4',
    severity: 'low',
    title: 'Policy violation - USB device',
    device: 'workstation-18',
    createdAt: '2024-12-15T09:00:00Z',
    status: 'closed',
    description: 'Unauthorized USB device connected to workstation'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'New security alert',
    message: 'Suspicious activity detected on server-01',
    timestamp: '2 minutes ago',
    unread: true,
    type: 'warning'
  },
  {
    id: '2',
    title: 'System update',
    message: 'Security patches have been applied',
    timestamp: '1 hour ago',
    unread: true,
    type: 'success'
  },
  {
    id: '3',
    title: 'Backup completed',
    message: 'Daily backup completed successfully',
    timestamp: '3 hours ago',
    unread: false,
    type: 'info'
  },
  {
    id: '4',
    title: 'Certificate warning',
    message: 'SSL certificate expires in 7 days',
    timestamp: '5 hours ago',
    unread: false,
    type: 'warning'
  }
];
