import sql from '../../src/db';
import { groupBy } from '../../src/utils';

export default async function(req, res) {
	res.status(200).json({test: 'test'});
}