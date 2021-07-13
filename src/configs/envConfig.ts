import { ConfigModuleOptions } from '@nestjs/config'

export function envConfig(): ConfigModuleOptions {
	return {
		envFilePath: 'local.env',
		isGlobal: true,
	}
}
