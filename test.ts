const bcrypt = require("bcryptjs");

const run = async () => {
  const hash = "$2b$10$3KsnFyejDt8Fdfi3zYxjj.U9KS9T.9rrJP71PKGiRkBzv4BiOFbXG";

  const ok = await bcrypt.compare("123456", hash);

  console.log(ok); // phải true
};

run();