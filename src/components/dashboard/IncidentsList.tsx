"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IncidentItem, ComponentState } from '@/types/dashboard';
import { AlertTriangle, AlertCircle, Info, X, User, Clock } from 'lucide-react';
import TimeAgo from 'react-timeago';

interface IncidentsListProps extends ComponentState {
  incidents: IncidentItem[];
}

export function IncidentsList({ 
  incidents, 
  isLoading = false, 
  isError = false,
  errorMessage = "Failed to load incidents",
  emptyMessage = "No incidents found"
}: IncidentsListProps) {
  const [selectedIncident, setSelectedIncident] = useState<IncidentItem | null>(null);

  const getSeverityIcon = (severity: IncidentItem['severity']) => {
    switch (severity) {
      case "critical":
        return <X className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: IncidentItem['severity']) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "high":
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">High</Badge>;
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Medium</Badge>;
      case "low":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Low</Badge>;
    }
  };

  const getStatusBadge = (status: IncidentItem['status']) => {
    switch (status) {
      case "open":
        return <Badge variant="destructive">Open</Badge>;
      case "acknowledged":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Acknowledged</Badge>;
      case "closed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Closed</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (incidents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex items-center gap-3">
                  {getSeverityIcon(incident.severity)}
                  <div>
                    <p className="font-medium">{incident.title}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {incident.device && <span>{incident.device}</span>}
                      <Clock className="h-3 w-3" />
                      <TimeAgo date={incident.createdAt} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getSeverityBadge(incident.severity)}
                  {getStatusBadge(incident.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                {getSeverityIcon(selectedIncident.severity)}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedIncident.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {getSeverityBadge(selectedIncident.severity)}
                    {getStatusBadge(selectedIncident.status)}
                  </div>
                </div>
              </div>

              {selectedIncident.description && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedIncident.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <span className="ml-2 font-medium">
                    <TimeAgo date={selectedIncident.createdAt} />
                  </span>
                </div>
                {selectedIncident.device && (
                  <div>
                    <span className="text-muted-foreground">Device:</span>
                    <span className="ml-2 font-medium">{selectedIncident.device}</span>
                  </div>
                )}
                {selectedIncident.assignee && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Assignee:</span>
                    <span className="font-medium">{selectedIncident.assignee}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedIncident(null)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button className="flex-1">
                  Acknowledge
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
