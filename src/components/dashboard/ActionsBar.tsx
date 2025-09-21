"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, FileText, Settings, AlertTriangle } from 'lucide-react';

interface ActionsBarProps {
  onLockdown?: () => void;
  onGenerateReport?: () => void;
  onSystemSettings?: () => void;
  isLoading?: boolean;
}

export function ActionsBar({ 
  onLockdown, 
  onGenerateReport, 
  onSystemSettings,
  isLoading = false 
}: ActionsBarProps) {
  const [isLockdownDialogOpen, setIsLockdownDialogOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleLockdown = async () => {
    setIsExecuting(true);
    try {
      await onLockdown?.();
      setIsLockdownDialogOpen(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const actions = [
    {
      id: 'lockdown',
      title: 'Lockdown System',
      description: 'Emergency security protocol',
      icon: <Shield className="h-6 w-6" />,
      variant: 'destructive' as const,
      onClick: () => setIsLockdownDialogOpen(true),
      disabled: isLoading || isExecuting
    },
    {
      id: 'report',
      title: 'Generate Report',
      description: 'Security incident summary',
      icon: <FileText className="h-6 w-6" />,
      variant: 'outline' as const,
      onClick: onGenerateReport,
      disabled: isLoading
    },
    {
      id: 'settings',
      title: 'System Settings',
      description: 'Configure security policies',
      icon: <Settings className="h-6 w-6" />,
      variant: 'outline' as const,
      onClick: onSystemSettings,
      disabled: isLoading
    }
  ];

  return (
    <>
      <Card className="sticky bottom-4 z-10">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                onClick={action.onClick}
                disabled={action.disabled}
                className="h-auto p-4 justify-start"
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  <div className="text-left">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm opacity-80">{action.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isLockdownDialogOpen} onOpenChange={setIsLockdownDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Emergency Lockdown
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This action will immediately lockdown the entire system and may cause service disruption. 
              Are you sure you want to proceed?
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-800 dark:text-red-200">
                <strong>Warning:</strong> This action cannot be undone and will require manual intervention to restore normal operations.
              </p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsLockdownDialogOpen(false)}
                className="flex-1"
                disabled={isExecuting}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLockdown}
                className="flex-1"
                disabled={isExecuting}
              >
                {isExecuting ? 'Executing...' : 'Confirm Lockdown'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
