import autocannon from 'autocannon';

(async () => {
  const total = 10;
  let avrg = 0;

  for (let i = 0; i < total; i++) {
    console.log(`Running test ${i + 1} of ${total}`);
    const result = await autocannon({
      url: `http://http://137.184.38.84/:3000/hello`,
      connections: 900,
      pipelining: 2,
      duration: 10
    });
    const count = result?.statusCodeStats['200']?.count || 0;

    avrg += count;
    console.log(count);
  }

  console.log("Avrg:", avrg / total);
})();