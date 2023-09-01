const userLogin = ({ email, password }) => {
  const sql = `
    SELECT 
      user_id, username, email
      FROM user
      WHERE 
        email = ?
      AND
        password = SHA1(UNHEX(SHA1(?)));
  `;
  const params = [email, password];
  return { sql, params };
};

const getUser = ({ email }) => {
  const sql = `
    SELECT 
      user_id, username, email
      FROM user
      WHERE 
        email = ?;
  `;
  const params = [email];
  return { sql, params };
};

module.exports = { userLogin, getUser };
