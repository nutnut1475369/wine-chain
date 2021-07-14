import { KeyConfig } from '../dtos/types/key-config.type';
import { ENV } from './env';

export function getConfigBoolean(key: KeyConfig): boolean {
	const val = process.env[key];
	return val == 'true';
}

export function getConfig(key: KeyConfig): string {
	return process.env[key];
}

export function env():ENV{
	return process.env['NODE_ENV'] as ENV || 'local'
}

export function isLocal():boolean{
	return env()==='local'
}