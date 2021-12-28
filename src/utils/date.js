import dayjs from 'dayjs';

/**
 * @param {string|number} date
 * @returns {dayjs.Dayjs}
 */
export function initDate(date) {
  return dayjs(date);
}

/**
 *
 * @param {string|number|dayjs.Dayjs} date
 * @param {['day', 'week', 'month', 'year']} unit
 * @returns {dayjs.Dayjs}
 */
export function endOf(date, unit) {
  return initDate(date).endOf(unit);
}

/**
 *
 * @param {string|number|dayjs.dayjs} date
 * @param {number} count
 * @returns {dayjs.Dayjs}
 */
export function addDays(date, count) {
  return initDate(date).add(count, 'day');
}

/**
 * Create a string of a desired date format
 * @param {string|number|dayjs.Dayjs} date
 * @param {string} format
 * @return {string}
 */
export function formatDate(date, format) {
  return initDate(date).format(format);
}

/**
 * Return a timestamp of the date
 * @param {string|dayjs.Dayjs} date
 * @returns {string}
 */
export function getTimestamp(date) {
  return initDate(date).valueOf();
}
