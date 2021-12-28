/* eslint-disable import/prefer-default-export */
import papa from 'papaparse';

export const parseCsv = (text) => papa.parse(text, { header: true });
