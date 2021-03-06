import * as Joi from 'joi';
import { Traders } from './Traders';

const traderPayload: any = {
  name: Joi.string().required(),
  test: Joi.boolean().required(),
  silent: Joi.boolean().optional(),
  flush: Joi.boolean().optional(),
  saveInputs: Joi.boolean().optional(),
  persist: Joi.boolean().optional(),
  strategie: Joi.string().required(),
  stratOpts: Joi.object().optional(),
  capital: Joi.number().required(),
  percentInvest: Joi.number().required(),
  base: Joi.string().required(),
  quote: Joi.string().required(),
  env: {
    watchList: Joi.any().required(),
    warmup: Joi.number().optional(),
    batchSize: Joi.number().optional(),
    bufferSize: Joi.number().optional(),
    backtest: {
      start: Joi.string().required(),
      stop: Joi.string().required(),
    },
    aggTimes: Joi.array().optional(),
    candleSetPlugins: Joi.array().optional(),
  },
  exchange: {
    name: Joi.string().required(),
    apiKey: Joi.string().optional(),
    apiSecret: Joi.string().optional(),
  },
};

export const routes: any[] = [
  {
    method: 'POST',
    path: '/traders/optimize',
    handler: Traders.optimizeTrader,
    options: {
      validate: {
        payload: {
          opts: Joi.object(),
          trader: traderPayload,
        },
      },
      tags: ['Traders', 'API'],
      description: 'POST Optimize a trader strategy using genetic algorithm',
    },
  },
  {
    method: 'POST',
    path: '/traders',
    handler: Traders.createTrader,
    options: {
      validate: {
        payload: traderPayload,
      },
      tags: ['Traders', 'API'],
      description: 'POST Create a new trader with the given configuration',
    },
  },
  {
    method: 'GET',
    path: '/traders/{name}/start',
    handler: Traders.startTrader,
    options: {
      tags: ['Traders', 'API'],
      description: 'GET start a specific trader (reload from mongodb)',
    },
  },
  {
    method: 'GET',
    path: '/traders/{name}/stop',
    handler: Traders.stopTrader,
    options: {
      tags: ['Traders', 'API'],
      description: 'GET stop a specific trader (still persisted in mongo/influx)',
    },
  },
  {
    method: 'GET',
    path: '/traders',
    handler: Traders.getTraders,
    options: {
      tags: ['Traders', 'API'],
      description: 'GET Fetch every traders',
    },
  },
  {
    method: 'GET',
    path: '/traders/{name}',
    handler: Traders.getTrader,
    options: {
      tags: ['Traders', 'API'],
      description: 'GET Fetch a specific trader',
    },
  },
  {
    method: 'DELETE',
    path: '/traders/{name}',
    handler: Traders.deleteTrader,
    options: {
      tags: ['Traders', 'API'],
      description: 'DELETE Delete a specific trader',
    },
  },
];
