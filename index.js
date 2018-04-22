const PRIMARY = range(9);
const primes = [];

function first (array) {
  return array[0];
}

function last (array) {
  return array[array.length - 1];
}

function sum (array) {
  return array.reduce((a, b) => a + b);
}

function subtract (array) {
  return array.reduce((a, b) => a - b);
}

function multiply (array) {
  return array.reduce((a, b) => a * b);
}

function divide (array) {
  return array.reduce((a, b) => a / b);
}

function range (n) {
  const a = [];

  for (let i = 1; i < (n + 1); i += 1) {
    a.push(i);
  }

  return a;
}

function isPrime (n) {
  return n !== 0 && !(PRIMARY
    .slice(1)
    .filter(p => p !== n)
    .some(p => n % p === 0));
}

function isComposite (n) {
  return !isPrime(n);
}

function factors (n) {
  const a = [];
  let remainder = n;
  const increment = i => remainder % i > 0 ? i + 1 : i;
  let i = 2;

  if (n === 1) {
    return [1];
  }

  while (i <= remainder && remainder > 0) {
    if (remainder % i === 0) {
      a.push(i);
    }

    remainder = remainder % i === 0 ? remainder / i : remainder;
    i = increment(i);
  }

  return a;
}

function getPrimes () {
  let increment = 1;

  return {
    next () {
      let current = () => (last(primes) || 0) + increment;

      while (!isPrime(current())) {
        increment += 1;
      }

      primes.push(current());

      return last(primes);
    },
    take (quan) {
      if (quan <= 0) {
        throw {
          name: 'Quantity error',
          message: '`quan` should be greater than 0'
        }
      }

      if (primes.length >= quan) {
        return primes.slice(0, quan);
      }

      for (let i = primes.length; i < quan; i += 1) {
        getPrimes().next();
      }

      return primes;
    }
  }
}

const metria = {
  first,
  last,
  sum,
  subtract,
  multiply,
  divide,
  primes,
  range,
  isPrime,
  isComposite,
  factors,
  getPrimes
};

module.exports = metria;
