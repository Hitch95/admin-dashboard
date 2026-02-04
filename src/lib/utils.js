import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

// Récupérer la locale du navigateur ou fallback sur 'fr-FR'
const locale = typeof navigator !== 'undefined' ? navigator.language : 'fr-FR';

export const formatValue = (value, type) => {
	switch (type) {
		case 'currency':
			return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
		case 'number':
			return new Intl.NumberFormat(locale).format(value);
		case 'percent':
			return (
				value.toLocaleString(locale, {
					minimumFractionDigits: 1,
					maximumFractionDigits: 1
				}) + ' %'
			);
		default:
			return value;
	}
};

export const calculateChange = (current, previous) => {
	if (!previous) return 0;
	return Math.round(((current - previous) / previous) * 1000) / 10;
};