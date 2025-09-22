import React from 'react';

export default function RecentEvents() {
  const events = [
    { 
      type: "High", 
      event: "Suspicious network activity detected", 
      time: "2 minutes ago", 
      severity: "high" 
    },
    { 
      type: "Medium", 
      event: "Failed login attempt from unknown IP", 
      time: "5 minutes ago", 
      severity: "medium" 
    },
    { 
      type: "Low", 
      event: "System update completed", 
      time: "10 minutes ago", 
      severity: "low" 
    },
    { 
      type: "Medium", 
      event: "Malware signature updated", 
      time: "15 minutes ago", 
      severity: "medium" 
    },
    { 
      type: "High", 
      event: "DDoS attack blocked", 
      time: "22 minutes ago", 
      severity: "high" 
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Events</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                  event.severity === 'high' ? 'bg-red-400' : 
                  event.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 dark:text-white text-sm font-medium">{event.event}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{event.time}</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  event.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 
                  event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' : 
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                }`}>
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
