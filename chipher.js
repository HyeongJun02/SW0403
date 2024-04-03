const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function caesarCipher(text, shift) {
  return text.split('').map(char => { // 모든 문자를 문자 단위로 나눔 + map을 통해 한 문자 씩 for문 돌 듯이 실행
    if (char.match(/[a-z]/i)) { // 정규표현식으로, i 플래그를 포함하여 a-z까지 문자를 대소문자 구분없이(i의 역할) 찾음
      let code = char.charCodeAt(); // code = 캐릭터값이 가지고 있는 숫자값 (아스키코드)
      
      if (code >= 65 && code <= 90) { // 대문자의 경우
        return String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65); // 좀 과한 연산 같긴 하네..
      } else if (code >= 97 && code <= 122) { // 소문자의 경우
        return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
      }
    }
    return char;
  }).join('');
}

function ask() {
  rl.question('파일 경로를 입력해주세요 : ', (filePath) => {
    rl.question('암호화는 +, 복호화는 -를 입력해주세요(+,-) : ', (method) => { // method: +, -
      rl.question('암호화 키를 입력해주세요(정수) : ', (key) => {
        const shift = parseInt(key); // key를 정수로 변환
        if (isNaN(shift)) { // shift(정수로 바꾼 key)가 정말 정수인가?
            console.log('잘못된 키 값입니다. 숫자를 입력해주세요.');
            rl.close();
            return;
        }
        processFile(filePath, method, shift); // 경로, +/-, 값(정수)
      });      
    });
  });  
}

function processFile(filePath, method, shift) {
  fs.readFile(filePath, 'utf8', (err, data) => { // 파일 읽기
    if (err) {
      console.error('파일을 읽는 동안 오류가 발생했습니다:', err);
      return;
    }

    const k = method === '+' ? shift : -shift; // k = 암호화: +, 복호화: -
    const proc = method === '+' ? 'enc' : 'dec'; // proc = 암호화: enc, 복호화: dec
    
    const processedText = caesarCipher(data, k);
    console.log('처리된 텍스트:', processedText);

    // 결과를 새 파일에 저장
    const outputPath = `${filePath}_${proc}`; // {filePath}_(enc/dec)
    fs.writeFile(outputPath, processedText, (err) => { // 파일 쓰기
      if (err) {
        console.error('파일을 쓰는 동안 오류가 발생했습니다:', err);
      } else {
        console.log(`파일이 성공적으로 쓰여졌습니다: ${outputPath}`);
      }
    });
  });
  rl.close();
}

// 호출 흐름 : ask -> processFile -> caesarCipher
// 사용자 입력에 따른 결정 -> 읽기/쓰기 -> 암호화
ask();
