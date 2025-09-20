import Link from "next/link"
import Image from "next/image"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Dashboard Navbar */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/odin_logo.png"
                alt="Odin Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="text-white text-xl font-bold">odin</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/dashboard" className="text-white/90 hover:text-white text-sm font-medium">
                Overview
              </Link>
              <Link href="/dashboard/events" className="text-white/90 hover:text-white text-sm font-medium">
                Events
              </Link>
              <Link href="/dashboard/incidents" className="text-white/90 hover:text-white text-sm font-medium">
                Incidents
              </Link>
              <Link href="/dashboard/devices" className="text-white/90 hover:text-white text-sm font-medium">
                Devices
              </Link>
              <Link href="/dashboard/analytics" className="text-white/90 hover:text-white text-sm font-medium">
                Analytics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-white/70 text-sm">Organization: Demo Corp</div>
            <div className="h-8 w-8 rounded-full bg-[#811bf6] flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Security Operations Dashboard</h1>
          <p className="text-gray-400">Real-time threat monitoring and incident response</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Events</p>
                <p className="text-2xl font-bold text-white">12,847</p>
              </div>
              <div className="h-12 w-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-400 text-sm">+12%</span>
              <span className="text-gray-400 text-sm ml-2">from last week</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Incidents</p>
                <p className="text-2xl font-bold text-white">23</p>
              </div>
              <div className="h-12 w-12 bg-red-600/20 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-red-400 text-sm">+5</span>
              <span className="text-gray-400 text-sm ml-2">from yesterday</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Connected Devices</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="h-12 w-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-400 text-sm">99.2%</span>
              <span className="text-gray-400 text-sm ml-2">uptime</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Threat Score</p>
                <p className="text-2xl font-bold text-white">Medium</p>
              </div>
              <div className="h-12 w-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-yellow-400 text-sm">Level 3</span>
              <span className="text-gray-400 text-sm ml-2">of 5</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Recent Events</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { type: "High", event: "Suspicious network activity detected", time: "2 minutes ago", severity: "high" },
                  { type: "Medium", event: "Failed login attempt from unknown IP", time: "5 minutes ago", severity: "medium" },
                  { type: "Low", event: "System update completed", time: "10 minutes ago", severity: "low" },
                  { type: "Medium", event: "Malware signature updated", time: "15 minutes ago", severity: "medium" },
                  { type: "High", event: "DDoS attack blocked", time: "22 minutes ago", severity: "high" },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        event.severity === 'high' ? 'bg-red-400' : 
                        event.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                      }`} />
                      <div>
                        <p className="text-white text-sm font-medium">{event.event}</p>
                        <p className="text-gray-400 text-xs">{event.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      event.severity === 'high' ? 'bg-red-900/50 text-red-300' : 
                      event.severity === 'medium' ? 'bg-yellow-900/50 text-yellow-300' : 'bg-green-900/50 text-green-300'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">System Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { service: "Threat Detection Engine", status: "operational", uptime: "99.9%" },
                  { service: "Event Processing", status: "operational", uptime: "99.7%" },
                  { service: "Database Cluster", status: "operational", uptime: "100%" },
                  { service: "API Gateway", status: "degraded", uptime: "95.2%" },
                  { service: "Notification Service", status: "operational", uptime: "99.5%" },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${
                        service.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'
                      }`} />
                      <span className="text-white text-sm font-medium">{service.service}</span>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm ${
                        service.status === 'operational' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {service.status}
                      </p>
                      <p className="text-gray-400 text-xs">{service.uptime} uptime</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-[#811bf6] hover:bg-[#6b1bb8] rounded-lg text-white text-left transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="font-medium">Lock Down System</p>
                  <p className="text-sm opacity-80">Emergency security protocol</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-left transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div>
                  <p className="font-medium">Generate Report</p>
                  <p className="text-sm opacity-80">Security incident summary</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-left transition-colors">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">System Settings</p>
                  <p className="text-sm opacity-80">Configure security policies</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
