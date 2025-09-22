// Demo data for Valkyrie file management system
export const demoFiles = [
  {
    id: 1,
    name: "Project_Proposal_Q4_2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-01-15",
    path: "/",
    file: null,
    description: "Quarterly project proposal with budget analysis",
    tags: ["project", "proposal", "q4", "budget"]
  },
  {
    id: 2,
    name: "Team_Photo_Retreat.jpg",
    type: "image",
    size: "4.2 MB",
    modified: "2024-01-14",
    path: "/",
    file: null,
    description: "Team building retreat photos",
    tags: ["team", "photos", "retreat"]
  },
  {
    id: 3,
    name: "Database_Schema_v2.sql",
    type: "sql",
    size: "156 KB",
    modified: "2024-01-13",
    path: "/",
    file: null,
    description: "Updated database schema for user management",
    tags: ["database", "schema", "sql", "v2"]
  },
  {
    id: 4,
    name: "Presentation_Deck.pptx",
    type: "presentation",
    size: "8.7 MB",
    modified: "2024-01-12",
    path: "/",
    file: null,
    description: "Client presentation for new features",
    tags: ["presentation", "client", "features"]
  },
  {
    id: 5,
    name: "API_Documentation.md",
    type: "markdown",
    size: "89 KB",
    modified: "2024-01-11",
    path: "/",
    file: null,
    description: "Complete API documentation for developers",
    tags: ["api", "documentation", "dev"]
  },
  {
    id: 6,
    name: "Security_Audit_Report.pdf",
    type: "pdf",
    size: "1.8 MB",
    modified: "2024-01-10",
    path: "/",
    file: null,
    description: "Third-party security audit results",
    tags: ["security", "audit", "report"]
  },
  {
    id: 7,
    name: "Product_Demo_Video.mp4",
    type: "video",
    size: "45.2 MB",
    modified: "2024-01-09",
    path: "/",
    file: null,
    description: "Product demonstration video for stakeholders",
    tags: ["demo", "video", "product"]
  },
  {
    id: 8,
    name: "Code_Review_Notes.txt",
    type: "text",
    size: "12 KB",
    modified: "2024-01-08",
    path: "/",
    file: null,
    description: "Code review feedback and improvements",
    tags: ["code", "review", "feedback"]
  }
];

export const demoFolders = [
  {
    id: 1,
    name: "Projects",
    itemCount: 12,
    modified: "2024-01-15",
    path: "/",
    description: "Active project files and documentation",
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Design Assets",
    itemCount: 8,
    modified: "2024-01-14",
    path: "/",
    description: "UI/UX design files and resources",
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Meeting Notes",
    itemCount: 15,
    modified: "2024-01-13",
    path: "/",
    description: "Team meeting notes and action items",
    color: "#10b981"
  },
  {
    id: 4,
    name: "Legal Documents",
    itemCount: 6,
    modified: "2024-01-12",
    path: "/",
    description: "Contracts, agreements, and legal files",
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "Archive",
    itemCount: 23,
    modified: "2024-01-11",
    path: "/",
    description: "Archived files and old versions",
    color: "#6b7280"
  }
];

export const demoProjects = [
  {
    id: 1,
    name: "Apollo",
    description: "Main product development project",
    files: 45,
    lastModified: "2024-01-15",
    status: "active",
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "Zephyr",
    description: "Experimental features and prototypes",
    files: 23,
    lastModified: "2024-01-14",
    status: "active",
    color: "#8b5cf6"
  },
  {
    id: 3,
    name: "Atlas",
    description: "Infrastructure and deployment",
    files: 18,
    lastModified: "2024-01-13",
    status: "maintenance",
    color: "#10b981"
  }
];

export const demoUsers = [
  {
    id: 1,
    name: "Alex Chen",
    email: "alex.chen@company.com",
    role: "CEO",
    avatar: null,
    lastActive: "2024-01-15T10:30:00Z",
    projects: ["Apollo", "Zephyr", "Atlas"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Lead Developer",
    avatar: null,
    lastActive: "2024-01-15T09:45:00Z",
    projects: ["Apollo", "Zephyr"]
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    email: "mike.rodriguez@company.com",
    role: "Designer",
    avatar: null,
    lastActive: "2024-01-15T08:20:00Z",
    projects: ["Apollo", "Atlas"]
  }
];

export const demoNotifications = [
  {
    id: 1,
    title: "File Upload Complete",
    message: "Project_Proposal_Q4_2024.pdf has been successfully uploaded",
    type: "success",
    timestamp: "2024-01-15T10:30:00Z",
    read: false
  },
  {
    id: 2,
    title: "Storage Warning",
    message: "You're using 85% of your storage quota",
    type: "warning",
    timestamp: "2024-01-15T09:15:00Z",
    read: false
  },
  {
    id: 3,
    title: "Team Access Granted",
    message: "Sarah Johnson has been granted access to Apollo project",
    type: "info",
    timestamp: "2024-01-15T08:45:00Z",
    read: true
  },
  {
    id: 4,
    title: "Security Alert",
    message: "Unusual login activity detected from new location",
    type: "error",
    timestamp: "2024-01-14T16:20:00Z",
    read: true
  }
];

export const demoActivity = [
  {
    id: 1,
    user: "Alex Chen",
    action: "uploaded",
    target: "Project_Proposal_Q4_2024.pdf",
    timestamp: "2024-01-15T10:30:00Z",
    type: "file"
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "created folder",
    target: "Design Assets",
    timestamp: "2024-01-15T09:45:00Z",
    type: "folder"
  },
  {
    id: 3,
    user: "Mike Rodriguez",
    action: "shared",
    target: "Team_Photo_Retreat.jpg",
    timestamp: "2024-01-15T08:20:00Z",
    type: "file"
  },
  {
    id: 4,
    user: "Alex Chen",
    action: "deleted",
    target: "old_document.pdf",
    timestamp: "2024-01-14T16:30:00Z",
    type: "file"
  }
];

// Demo storage calculation
export const calculateDemoStorage = () => {
  const totalFiles = demoFiles.length;
  const totalSize = demoFiles.reduce((sum, file) => {
    const size = file.size;
    if (size.includes('MB')) {
      return sum + parseFloat(size) * 1024;
    } else if (size.includes('KB')) {
      return sum + parseFloat(size);
    }
    return sum;
  }, 0);
  
  const totalKB = totalSize;
  const totalMB = totalKB / 1024;
  const totalGB = totalMB / 1024;
  
  return {
    used: totalGB > 1 ? `${totalGB.toFixed(2)} GB` : `${totalMB.toFixed(1)} MB`,
    total: "10 GB",
    percentage: Math.min((totalGB / 10) * 100, 100),
    status: totalGB > 8 ? 'critical' : totalGB > 6 ? 'warning' : totalGB > 4 ? 'good' : 'excellent'
  };
};
