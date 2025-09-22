// Storage calculation utilities
export const calculateStorageUsage = (files) => {
  if (!files || files.length === 0) {
    return {
      used: 0,
      total: 10 * 1024 * 1024 * 1024, // 10GB default
      percentage: 0,
      usedFormatted: '0 B',
      totalFormatted: '10 GB',
      remainingFormatted: '10 GB'
    };
  }

  // Calculate total used storage from files
  const usedBytes = files.reduce((total, file) => {
    if (file.file && file.file.size) {
      return total + file.file.size;
    }
    // If no file object, try to parse from size string
    if (file.size) {
      const sizeMatch = file.size.match(/(\d+\.?\d*)\s*(MB|KB|GB|B)/i);
      if (sizeMatch) {
        const value = parseFloat(sizeMatch[1]);
        const unit = sizeMatch[2].toUpperCase();
        const multiplier = {
          'B': 1,
          'KB': 1024,
          'MB': 1024 * 1024,
          'GB': 1024 * 1024 * 1024
        };
        return total + (value * multiplier[unit]);
      }
    }
    return total;
  }, 0);

  const totalBytes = 10 * 1024 * 1024 * 1024; // 10GB
  const percentage = Math.round((usedBytes / totalBytes) * 100);
  const remainingBytes = totalBytes - usedBytes;

  return {
    used: usedBytes,
    total: totalBytes,
    percentage: Math.min(percentage, 100),
    usedFormatted: formatBytes(usedBytes),
    totalFormatted: formatBytes(totalBytes),
    remainingFormatted: formatBytes(Math.max(remainingBytes, 0))
  };
};

export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const getStorageStatus = (percentage) => {
  if (percentage >= 90) return { status: 'critical', color: 'text-purple-400' };
  if (percentage >= 75) return { status: 'warning', color: 'text-yellow-400' };
  if (percentage >= 50) return { status: 'good', color: 'text-green-400' };
  return { status: 'excellent', color: 'text-blue-400' };
};
