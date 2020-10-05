import pokemon from "../../pokemon.json";

export default (req, res) => {
  if (!req.query.name) {
    res.statusCode = 400;
    return res.end("Must have a name");
  }
  const { name } = req.query;
  const found = pokemon.filter(({ name: { english } }) => english === name);
  if (found.length === 0) {
    res.statusCode = 404;
    return res.end("No pokemon found for name", name);
  }
  res.statusCode = 200;
  res.json(found[0]);
};
