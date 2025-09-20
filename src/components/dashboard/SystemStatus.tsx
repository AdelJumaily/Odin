import React from 'react';

export default function SystemStatus() {
  const services = [
    { service: "Threat Detection Engine", status: "operational", uptime: "99.9%" },
    { service: "Event Processing", status: "operational", uptime: "99.7%" },
    { service: "Database Cluster", status: "operational", uptime: "100%" },
    { service: "API Gateway", status: "degraded", uptime: "95.2%" },
    { service: "Notification Service", status: "operational", uptime: "99.5%" },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Status</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <div className={`h-3 w-3 rounded-full flex-shrink-0 ${
                  service.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
                }`} />
                <span className="text-gray-900 dark:text-white text-sm font-medium">{service.service}</span>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm ${
                  service.status === 'operational' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                }`}>
                  {service.status}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{service.uptime} uptime</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
