/*
 * LiskHQ/lisk-service
 * Copyright © 2020 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 *
 */
import Joi from 'joi';

const { jsonRPCSchema } = require('./rpcGenerics.schema');

const allowedPeerStateCodes = [0, 1, 2];
const allowedPeerStateNames = ['connected', 'disconnected'];

const locationSchema = {
	city: Joi.string().optional(),
	countryCode: Joi.string().length(2).optional(),
	countryName: Joi.string().optional(),
	hostname: Joi.string().optional(),
	ip: Joi.string().ip({ version: 'ipv4', cidr: 'forbidden' }).optional(),
	latitude: Joi.string().pattern(/^[0-9.-]+$/).optional(),
	longitude: Joi.string().pattern(/^[0-9.-]+$/).optional(),
	regionCode: Joi.string().optional(),
	regionName: Joi.string().optional(),
	timeZone: Joi.string().optional(),
	zipCode: Joi.string().optional(),
};

const peerSchema = {
	ip: Joi.string().ip({ version: 'ipv4', cidr: 'forbidden' }).required(),
	httpPort: Joi.number().port().optional(),
	wsPort: Joi.number().port().optional(),
	os: Joi.string().allow('').optional(),
	version: Joi.string().required(),
	state: Joi.number().integer().valid(...allowedPeerStateCodes).required(),
	stateName: Joi.string().valid(...allowedPeerStateNames).required(),
	height: Joi.number().optional(),
	broadhash: Joi.string().allow('').optional(),
	nonce: Joi.string().allow('').optional(),
	hostname: Joi.string().optional(),
	location: Joi.object(locationSchema).optional(),
};

const emptyResultEnvelopeSchema = {
	data: Joi.array().length(0).required(),
	meta: Joi.object().required(),
	links: Joi.object().optional(),
};

const emptyResponseSchema = {
	jsonrpc: jsonRPCSchema,
	result: emptyResultEnvelopeSchema,
	id: Joi.alternatives(Joi.number(), Joi.string(), null).required(),
};

module.exports = {
	peerSchema: Joi.object(peerSchema),
	emptyResultEnvelopeSchema: Joi.object(emptyResultEnvelopeSchema).required(),
	emptyResponseSchema: Joi.object(emptyResponseSchema).required(),
};
