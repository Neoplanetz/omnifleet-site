import { ko } from '../src/i18n/ko';
import { en } from '../src/i18n/en';

function keys(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => keys(v, `${path}[${i}]`));
  }
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => keys(v, path ? `${path}.${k}` : k));
  }
  return [path];
}

const koKeys = new Set(keys(ko));
const enKeys = new Set(keys(en));
const missingInEn = [...koKeys].filter((k) => !enKeys.has(k));
const missingInKo = [...enKeys].filter((k) => !koKeys.has(k));

if (missingInEn.length > 0 || missingInKo.length > 0) {
  console.error('i18n parity FAILED');
  if (missingInEn.length > 0) console.error('  missing in en:', missingInEn);
  if (missingInKo.length > 0) console.error('  missing in ko:', missingInKo);
  process.exit(1);
}
console.log(`i18n parity OK (${koKeys.size} leaf keys)`);
