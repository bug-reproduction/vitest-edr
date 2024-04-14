import {execute} from 'rocketh';
import '@rocketh/deploy';
import {context} from './_context';

export default execute(
	context,
	async ({deploy, namedAccounts, artifacts}) => {
		const {deployer} = namedAccounts;

		await deploy('Greeter', {
			account: deployer,
			artifact: artifacts.Greeter,
			args: [''],
		});
	},
	{tags: ['Greeter', 'Greeter_deploy']},
);
