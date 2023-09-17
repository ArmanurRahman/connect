import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  DB_CONNECTION_STRING: Joi.string().required(),
});
