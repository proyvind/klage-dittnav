export enum AppEventEnum {
  CLEAR_ERRORS = 'Clear errors',
  CLICK_UPLOAD_ATTACHMENT = 'Click upload attachment',
  DELETE_ATTACHMENT = 'Delete attachment',
  DELETE_CASE = 'Delete case',
  DOWNLOAD = 'Click download button',
  DOWNLOAD_ATTACHMENT = 'Download attachment',
  FINALIZE = 'Click finalize button',
  INVALID = 'Invalid case data',
  VALID = 'Valid case data',
  LOGIN = 'Login',
  SSE_CLOSE = 'SSE close',
  SSE_ERROR = 'SSE error',
  SSE_EVENT_RECEIVED = 'SSE event received',
  SSE_OPEN = 'SSE open',
  START_UPLOAD_FILES = 'Start upload files',
  SUBMIT = 'Click submit button',
  CREATE_CASE_FROM_SESSION_STORAGE = 'Create case from session storage',
  CREATE_OR_RESUME_CASE = 'Create or resume case',
  CREATE_SESSION_CASE = 'Create session case',
  RESUME_SESSION_CASE = 'Resume session case',
  RESUME_SESSION_CASE_WITH_SAKSNUMMER = 'Resume session case with internal saksnummer',
  UPGRADE_SESSION = 'Upgrade session',
}
