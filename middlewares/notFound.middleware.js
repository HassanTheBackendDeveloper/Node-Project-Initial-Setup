export const notFound = (req, res) => {
  console.error("Route does not exist.");
  return res.status(404).send("<h3>Route does not exist.</h3>");
};
