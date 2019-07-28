module.exports = async function({ req }) {
  return { currentUser: req.currentUser };
};
