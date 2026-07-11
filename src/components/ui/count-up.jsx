import useCountUp from '../../hooks/useCountUp';

function parseValue(value) {
  const match = value.match(/^([\d,.]+)(K?)\+?%?$/);
  if (!match) return { target: 0, suffix: '' };

  let num = parseFloat(match[1].replace(/,/g, ''));
  const hasK = match[2] === 'K';
  if (hasK) num *= 1000;

  const suffix = value.includes('%') ? '%' : value.includes('+') ? '+' : '';

  return { target: Math.round(num), suffix, hasK };
}

function formatNumber(num, hasK) {
  if (hasK && num >= 1000) {
    const k = num / 1000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export default function CountUp({ value, className, duration = 2000 }) {
  const { target, suffix, hasK } = parseValue(value);
  const { ref, count } = useCountUp(target, duration);

  return (
    <span ref={ref} className={className}>
      {formatNumber(count, hasK)}
      {suffix}
    </span>
  );
}
