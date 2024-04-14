import {expect, describe, it} from 'vitest';
import {EIP1193GenericRequestProvider} from 'eip-1193';
import hre from 'hardhat';
import {loadAndExecuteDeployments} from 'rocketh';
import '@rocketh/deploy';
import {loadFixture} from '@nomicfoundation/hardhat-network-helpers';
import {context} from '../deploy/_context';

async function deployAll() {
	const provider = hre.network.provider as EIP1193GenericRequestProvider;
	const env = await loadAndExecuteDeployments(
		{
			provider,
		},
		context,
	);

	const Greeter = env.get<typeof env.artifacts.Greeter.abi>('Greeter');
	const deployer = env.namedAccounts.deployer;

	return {env, Greeter, deployer, otherAccounts: env.unnamedAccounts};
}

describe('Greeter', function () {
	it('greetings', async function () {
		const {env, Greeter, otherAccounts} = await loadFixture(deployAll);
		const greetingToSet = 'hello world';
		await expect(
			await env.read(Greeter, {
				functionName: 'greet',
			}),
		).to.equal('');

		await env.execute(Greeter, {functionName: 'setGreeting', args: [greetingToSet], account: otherAccounts[0]});

		await expect(
			await env.read(Greeter, {
				functionName: 'greet',
			}),
		).to.equal(greetingToSet);
	});
});
