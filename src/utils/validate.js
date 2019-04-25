/**
 * Created by 11/03/19
 */

export function isvalidUsername (str) {
  // eslint-disable-next-line camelcase
  const valid_map = ['tycoding', 'editor', 'admin', 'check1']
  return valid_map.indexOf(str.trim()) >= 0
}
