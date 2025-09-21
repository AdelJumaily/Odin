// User types
export const USER_ROLES = {
  CEO: 'ceo',
  ADMIN: 'admin', 
  EDITOR: 'editor',
  VIEWER: 'viewer',
  INTERN: 'intern'
};

export const ROLE_HIERARCHY = {
  [USER_ROLES.INTERN]: 0,
  [USER_ROLES.VIEWER]: 1,
  [USER_ROLES.EDITOR]: 2,
  [USER_ROLES.ADMIN]: 3,
  [USER_ROLES.CEO]: 4
};

// File types
export const FILE_TYPES = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  VIDEO: 'video',
  AUDIO: 'audio',
  ARCHIVE: 'archive',
  CODE: 'code',
  OTHER: 'other'
};

// API response types
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
};

// Search types
export const SEARCH_TYPES = {
  TEXT: 'text',
  ENTITY: 'entity',
  CONNECTED: 'connected'
};
