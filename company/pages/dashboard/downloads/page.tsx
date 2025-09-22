import AppLayout from '@/components/layout/AppLayout';

export default function DownloadsPage() {
  const files = [
    {
      name: "Security Report - Q4 2024.pdf",
      size: "2.4 MB",
      date: "Dec 15, 2024",
      type: "PDF"
    },
    {
      name: "Threat Analysis Data.csv",
      size: "1.2 MB", 
      date: "Dec 14, 2024",
      type: "CSV"
    },
    {
      name: "System Logs - December.zip",
      size: "15.8 MB",
      date: "Dec 13, 2024", 
      type: "ZIP"
    },
    {
      name: "Incident Response Guide.pdf",
      size: "3.1 MB",
      date: "Dec 12, 2024",
      type: "PDF"
    }
  ];

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Downloads</h1>
        <p className="text-gray-500 dark:text-gray-400">Download security reports, logs, and documentation</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Available Files</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{file.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                    {file.type}
                  </span>
                  <button className="px-4 py-2 bg-[#811bf6] hover:bg-[#6b1bb8] text-white text-sm font-medium rounded-lg transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
