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

const allowedDateFormats = ['YYYY-MM-DD', 'YYYY-MM'];

const goodRequestSchema = {
	data: Joi.object().required(),
	meta: Joi.object().required(),
	links: Joi.object().optional(),
};

const timelineItemSchema = {
	timestamp: Joi.number().integer().positive().required(),
	date: Joi.string().required(),
	transactionCount: Joi.number().integer().min(0).required(),
	volume: Joi.number().integer().min(0).required(),
};

const transactionStatisticsSchema = {
	timeline: Joi.array().items(timelineItemSchema).required(),
	distributionByType: Joi.object().required(),
	distributionByAmount: Joi.object().required(),
};

const metaSchema = {
	limit: Joi.number().required(),
	offset: Joi.number().required(),
	aggregateBy: Joi.string().optional(),
	dateFormat: Joi.string().valid(...allowedDateFormats).required(),
	dateFrom: Joi.string().required(),
	dateTo: Joi.string().required(),
};

module.exports = {
	timelineItemSchema: Joi.object(timelineItemSchema).required(),
	transactionStatisticsSchema: Joi.object(transactionStatisticsSchema).required(),
	goodRequestSchema: Joi.object(goodRequestSchema).required(),
	metaSchema: Joi.object(metaSchema).required(),
};
