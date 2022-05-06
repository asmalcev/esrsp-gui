import data from '../../public/groups.json';

export default function(req, res) {
	res.status(200).json(data);
}