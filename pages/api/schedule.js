import data from '../../public/schedule.json';

export default function(req, res) {
  res.status(200).json(data);
}