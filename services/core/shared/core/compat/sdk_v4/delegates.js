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
const coreApi = require('./coreApi');

const getDelegates = async params => {
	const punishmentHeight = 780000;
	const delegates = await coreApi.getDelegates(params);

	delegates.data.map((delegate, index) => {
		// delegate.address = delegate.address;
		// delegate.missedBlocks = delegate.missedBlocks;
		// delegate.producedBlocks = delegate.producedBlocks;
		// delegate.productivity = delegate.productivity;
		// delegate.publicKey = delegate.publicKey;
		// delegate.rewards = delegate.rewards;
		// delegate.username = delegate.username;

		const adder = (acc, curr) => acc + curr.amount;
		const totalVotes = delegate.votes.reduce(adder, 0);
		const selfVotes = delegate.votes
			.filter(vote => vote.delegateAddress === delegate.address).reduce(adder, 0);

		delegate.delegateWeight = Math.min(10 * selfVotes, totalVotes);
		delegate.vote = delegate.delegateWeight;
		delegate.totalVotesReceived = totalVotes - selfVotes;
		delegate.isBanned = delegate.delegate.isBanned;
		delegate.pomHeights = delegate.delegate.pomHeights
			.sort((a, b) => a - b).reverse().slice(0, 5)
			.map(height => ({ start: height, end: height + punishmentHeight }));
		delegate.lastForgedHeight = delegate.delegate.lastForgedHeight;
		delegate.consecutiveMissedBlocks = delegate.delegate.consecutiveMissedBlocks;
		// Rank is recalculated in the abstraction layer based on delegateWeight
		delegate.rank = params.offset + index + 1;

		return delegate;
	});

	return delegates;
};

module.exports = {
	getDelegates,
};
