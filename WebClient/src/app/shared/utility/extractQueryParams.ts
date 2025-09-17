export function extractQueryParams(url: string): Record<string, string> {
  const queryParams: Record<string, string> = {};
  const paramPattern = /[?&]([^=&]+)=([^&]+)/g;

  let match: RegExpExecArray | null;
  while ((match = paramPattern.exec(url)) !== null) {
    const paramName = decodeURIComponent(match[1]);
    const paramValue = decodeURIComponent(match[2]);
    queryParams[paramName] = paramValue;
  }

  return queryParams;
}
