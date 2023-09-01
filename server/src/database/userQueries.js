const createUser = ({ username, email, password }) => {
  const sql = `
    INSERT INTO user ( username, email, password) VALUES ( ?, ?, SHA1(UNHEX(SHA1(?))));`;
  const params = [username, email, password];
  return { sql, params };
};

module.exports = { createUser };
