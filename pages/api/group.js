import data from '../../public/group.json';

export default function(req, res) {
	res.status(200).json(data);
}