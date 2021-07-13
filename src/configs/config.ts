import { KeyConfig } from '../dtos/types/key-config.type';

export function getConfigBoolean(key: KeyConfig): boolean {
	const val = process.env[key];
	return val == 'true';
}

export function getConfig(key: KeyConfig): string {
	return process.env[key];
}