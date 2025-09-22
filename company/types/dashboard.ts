export interface KpiCard {
  label: string;
  value: number | string;
  delta?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export interface SystemService {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down";
  uptime: number;
  lastCheck?: string;
}

export interface EventRow {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  source: string;
  device: string;
  timestamp: string;
  description?: string;
}

export interface IncidentItem {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  device?: string;
  createdAt: string;
  status: "open" | "acknowledged" | "closed";
  description?: string;
  assignee?: string;
}

export interface ComponentState {
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
}

export interface FilterState {
  severity?: string;
  search?: string;
  status?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  unread: boolean;
  type: "info" | "warning" | "error" | "success";
}
