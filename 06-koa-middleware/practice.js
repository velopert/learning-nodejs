// 옛날 같았으면..
/*
function waitOneSec(cb) {
  console.log('1초만 기다릴게요');
  setTimeout(function () {
    console.log('째깍')
    if(cb) cb();
  }, 1000)
}

waitOneSec(
  function() {
    console.log('이것도 하고');
    waitOneSec(
      function() {
        console.log('저것도 하고');
        waitOneSec(
          function() {
            console.log('아 이것이 콜백지옥이죠');
          }
        );
      }
    )
  }
);
*/

// Promise 가 있다면
function waitOneSec(value) {
  console.log('1초만 기다릴게요');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('째깍');
      // 만약에 작업이 실패했을때는 reject 를 호출하여 에러를 알릴 수 있습니다.
      if (value > 3) reject(new Error('에러다 에러~'));
      console.log(value);
      resolve(value + 1); // 작업이 잘 끝났으면 resolve 를 호출하면 됩니다.
    }, 1000);
  });
}

/*
waitOneSec(1)
.then(waitOneSec)
.then(waitOneSec)
.then(waitOneSec)
.then(waitOneSec)
.catch(
  e => {
    console.log('에러가 발생했다네요.');
    console.log(e);
  }
)
*/

async function asyncSample() {
  try {
    let value = await waitOneSec(1);
    value = await waitOneSec(value);
    value = await waitOneSec(value);
    value = await waitOneSec(value);
    value = await waitOneSec(value);
  } catch (e) {
    console.log('에러가 발생했다네요!');
    console.log(e);
  }
}

asyncSample();
