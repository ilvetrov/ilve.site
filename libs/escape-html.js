export function escapeHtml(unsafe)
{
  return unsafe
  .replace(/&/g, "\&")
  .replace(/</g, "\<")
  .replace(/>/g, "\>")
  .replace(/"/g, "\"")
  .replace(/'/g, "\'")
}
export function unescapeHtml(unsafe)
{
  return unsafe
  .replace(/\&/g, "&")
  .replace(/\</g, "<").replace(/&lt;/g, "<")
  .replace(/\>/g, ">").replace(/&gt;/g, ">")
  .replace(/\"/g, '"')
  .replace(/\'/g, "'")
}