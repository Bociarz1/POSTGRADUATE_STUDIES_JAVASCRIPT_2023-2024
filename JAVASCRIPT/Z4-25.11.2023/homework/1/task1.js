// 1.	Create a function that returns a Promise that has a 50% chance of resolving, and 50% chance of rejecting, on resolve it should return “Now I work” and on reject “Now I don’t’.

function randomPromise() {
  return new Promise((resolve, reject) => {
    result = randomResult();
    if (result >= 0.5) resolve('Now I work');
    else reject('Now I do not');
  });
}

function randomResult() {
  return Math.random();
}

async function handlePromise() {
  try {
    const result = await randomPromise();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

handlePromise();
