import { ConfigModuleOptions } from '@nestjs/config'
import { isLocal } from './config'

export function envConfig(): ConfigModuleOptions {
	return {
		envFilePath: isLocal() ? 'local.env': '',
		isGlobal: true,
	}
}
