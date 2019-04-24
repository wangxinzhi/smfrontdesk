/**
 * Created by 11/03/19
 */

export function isvalidUsername (str) {
  const valid_map = ['tycoding', 'editor', 'admin']
  return valid_map.indexOf(str.trim()) >= 0
}
