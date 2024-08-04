import {
  IEnvElement,
  IEnvReturnedMessage,
} from '../interfaces/env-config.interfaces';
import * as process from 'node:process';
import { ConsoleColorsEnum } from '../enums/console-colors.enum';
import { ENVsConfig } from '../configs/env.config';

export function checkEnvironment(ENVs: typeof process.env): undefined {
  const returnMessages: Map<string, IEnvReturnedMessage> = new Map();

  for (let j = 0; j < ENVsConfig.length; j++) {
    ENVsConfig[j].bootedValue = ENVs[ENVsConfig[j].name];
  }

  for (let i = 0; i < ENVsConfig.length; i++) {
    const envElement = ENVsConfig[i];

    // required check part
    let required: boolean = true;
    if (typeof envElement.required === 'boolean' && !envElement.required) {
      required = false;
    } else if (typeof envElement.required !== 'boolean') {
      const linkedEnv = ENVsConfig.filter(
        (_env: IEnvElement) =>
          _env.type === 'boolean' && _env.name === envElement.required,
      )[0];
      // string what used for console message
      const linkedNameToConsole: string = `[${envElement.required} + ${envElement.name}]: `;
      if (!linkedEnv) {
        returnMessages.set(linkedNameToConsole, {
          envKey: envElement.name,
          type: 'error',
          message: `Cannot find ENV with "${envElement.required}" name or this ENV type is not boolean`,
        });
        continue;
      }

      let linkedEnvBootedValue: string | number | boolean =
        linkedEnv.bootedValue;

      if (linkedEnv.required === false) {
        returnMessages.set(linkedNameToConsole, {
          envKey: envElement.name,
          type: 'error',
          message: `ENV "${envElement.required}" cannot be non-required because it linked with "${envElement.name}" ENV!`,
        });
        continue;
      } else if (
        linkedEnvBootedValue === 'true' ||
        linkedEnvBootedValue === '1' ||
        linkedEnvBootedValue === 'false' ||
        linkedEnvBootedValue === '0' ||
        typeof linkedEnvBootedValue === 'boolean'
      ) {
        linkedEnvBootedValue =
          linkedEnvBootedValue === 'true' || linkedEnvBootedValue === '1';
      } else {
        returnMessages.set(linkedNameToConsole, {
          envKey: envElement.name,
          type: 'error',
          message: `ENV "${envElement.required}" have non-boolean value!`,
        });
        continue;
      }

      required = linkedEnvBootedValue as boolean;
    }
    // required check part end

    // string what used for console message
    const nameToConsole: string = `[${envElement.name}]: `;

    if (!required && !envElement.bootedValue) {
      returnMessages.set(nameToConsole, {
        envKey: envElement.name,
        type: 'warning',
        message: `Is undefined but it not required.`,
      });
      continue;
    }

    if (required && !envElement.bootedValue) {
      returnMessages.set(nameToConsole, {
        envKey: envElement.name,
        type: 'error',
        message: `Is required but value is undefined!`,
      });
      continue;
    }

    let typeIsCorrect: boolean = true;
    // check booted value type and convert it if it needs
    switch (envElement.type) {
      case 'boolean': {
        typeIsCorrect =
          envElement.bootedValue === 'true' ||
          envElement.bootedValue === '1' ||
          envElement.bootedValue === 'false' ||
          envElement.bootedValue === '0';
        envElement.bootedValue =
          typeIsCorrect &&
          (envElement.bootedValue === 'true' || envElement.bootedValue === '1');
        break;
      }
      case 'int': {
        envElement.bootedValue = Number.parseInt(
          envElement.bootedValue as string,
        );
        typeIsCorrect = !Number.isNaN(envElement.bootedValue);
        break;
      }
      case 'float': {
        envElement.bootedValue = Number.parseFloat(
          envElement.bootedValue as string,
        );
        typeIsCorrect = !Number.isNaN(envElement.bootedValue);
        break;
      }
    }

    if (!typeIsCorrect) {
      returnMessages.set(nameToConsole, {
        envKey: envElement.name,
        type: required ? 'error' : 'warning',
        message: required
          ? 'Is required but ENV value is undefined!'
          : 'ENV is undefined but it not required.',
      });
      continue;
    }

    let deepTypeCheckErrorMessage: string = '';
    // deeper type checker
    if (typeIsCorrect && envElement.bootedValue) {
      // number part
      if (envElement.type === 'int' || envElement.type === 'float') {
        if (
          envElement.minOrMinLength &&
          envElement.maxOrMaxLength &&
          envElement.minOrMinLength > envElement.maxOrMaxLength
        ) {
          deepTypeCheckErrorMessage =
            '"minOrMinLength" property is higher than "maxOrMinLength" property!';
        }
        if (!deepTypeCheckErrorMessage) {
          if (
            envElement.minOrMinLength &&
            (envElement.bootedValue as number) < envElement.minOrMinLength
          ) {
            deepTypeCheckErrorMessage =
              'ENV value is lower than "minOrMinLength" property!';
          }
          if (
            envElement.maxOrMaxLength &&
            (envElement.bootedValue as number) > envElement.maxOrMaxLength
          ) {
            deepTypeCheckErrorMessage =
              'ENV value is higher than "maxOrMaxLength" property!';
          }
        }
      }
      // number part end

      // string part
      if (envElement.type === 'string') {
        const value: string = envElement.bootedValue as string;
        if (value.length < envElement.minOrMinLength) {
          deepTypeCheckErrorMessage =
            'ENV value length is less than "minOrMinLength" property!';
        }
        if (value.length > envElement.maxOrMaxLength) {
          deepTypeCheckErrorMessage =
            'ENV value length is bigger than "maxOrMaxLength" property!';
        }
      }
      // string part end
    }
    typeIsCorrect = deepTypeCheckErrorMessage.length === 0;

    if (!required) {
      deepTypeCheckErrorMessage =
        'ENV is not required but ' +
        deepTypeCheckErrorMessage.replace('!', '.');
    }

    if (deepTypeCheckErrorMessage) {
      returnMessages.set(nameToConsole, {
        envKey: envElement.name,
        type: required ? 'error' : 'warning',
        message: deepTypeCheckErrorMessage,
      });
      continue;
    }

    returnMessages.set(nameToConsole, {
      envKey: envElement.name,
      type: required ? 'success' : 'info',
      message: 'Successfully loaded!',
    });
  }

  let hasEnvError: boolean = false;
  console.log(ConsoleColorsEnum.bright, `[Environment Checker Results]`);
  returnMessages.forEach((value: IEnvReturnedMessage, key: string) => {
    if (!hasEnvError && value.type === 'error') {
      hasEnvError = true;
    }
    let color: string = '\x1b[0m';
    switch (value.type) {
      case 'success':
        color = ConsoleColorsEnum.green;
        break;
      case 'warning':
        color = ConsoleColorsEnum.yellow;
        break;
      case 'error':
        color = ConsoleColorsEnum.red;
        break;
      case 'info':
        color = ConsoleColorsEnum.grey;
        break;
    }
    console.log(
      color,
      key + value.message /*+ ` (${process.env[value.envKey]})`*/,
    );
  });

  console.log();

  if (hasEnvError) {
    process.exit(1);
  }
}
