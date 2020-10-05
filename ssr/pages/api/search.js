import pokemon from "../../pokemon.json";

export default (req, res) => {
  const filter = req.query.q ? new RegExp(req.query.q, "i") : /.*/;
  const filtered = pokemon
    .filter(({ name: { english } }) => english.match(filter))
    .slice(0, 10);
  res.statusCode = 200;
  res.json(filtered);
};
