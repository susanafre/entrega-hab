const os = require("os");

function calculateFreeMem() {
  const total = (os.freemem() * 100) / os.totalmem();

  const totalRounded = Math.ceil(total, -1);
  console.log(`Tienes un total de ${totalRounded} % memoria libre`);
}

calculateFreeMem();
