export enum AppEventEnum {
  RESTORE_ERROR_REPORT = 'Restore Error Report from session storage',
  CASE_FROM_SESSION_STORAGE = 'Get case from session storage',
  CLEAR_ERRORS = 'Clear errors',
  CLICK_UPLOAD_ATTACHMENT = 'Click upload attachment',
  DELETE_ATTACHMENT = 'Delete attachment',
  DELETE_CASE = 'Delete case',
  DOWNLOAD = 'Click download button',
  DOWNLOAD_ATTACHMENT = 'Download attachment',
  FINALIZE = 'Click finalize button',
  INVALID = 'Invalid case data',
  LOGIN = 'Login',
  SSE_CLOSE = 'SSE close',
  SSE_ERROR = 'SSE error',
  SSE_EVENT_RECEIVED = 'SSE event received',
  SSE_OPEN = 'SSE open',
  START_UPLOAD_FILES = 'Start upload files',
  SUBMIT = 'Click submit button',
  UPDATE_CASE_FROM_SESSION_STORAGE = 'Update case from session storage',
  UPGRADE_SESSION = 'Upgrade session',
}