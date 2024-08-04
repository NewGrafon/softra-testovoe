import { IEnvElement } from '../interfaces/env-config.interfaces';
import { EnvNamesEnum } from '../enums/env-names.enum';

export const ENVsConfig: IEnvElement[] = [
  {
    name: EnvNamesEnum.db_host,
    type: 'string',
    required: true,
  },
  {
    name: EnvNamesEnum.db_port,
    type: 'int',
    minOrMinLength: 0,
    maxOrMaxLength: 65535,
    required: true,
  },
  {
    name: EnvNamesEnum.db_name,
    type: 'string',
    minOrMinLength: 1,
    required: true,
  },
  {
    name: EnvNamesEnum.db_user,
    type: 'string',
    minOrMinLength: 1,
    required: true,
  },
  {
    name: EnvNamesEnum.db_password,
    type: 'string',
    minOrMinLength: 1,
    required: true,
  },
  {
    name: EnvNamesEnum.mode,
    type: 'string',
    minOrMinLength: 1,
    required: true,
  },
] as const;
