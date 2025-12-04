  document.addEventListener("DOMContentLoaded", () => { animation() })

  function animation(){
      const textEl = document.getElementById("text");
      const caretEl = document.getElementById("caret");
      const finalLogoEl = document.getElementById("finalLogo");
      const typeContainerEl = document.querySelector(".type-container");

      const words = ["Art", "Skills", "Technic", "untitled"];

      const TYPE_DELAY = 100;          
      const ERASE_DELAY = 80;          
      const BETWEEN_WORD_DELAY = 1000;  
      const BEFORE_START_DELAY = 1000; 
      const LAST_DELAY = 500;

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async function typeWord(word) {
        for (let i = 0; i < word.length; i++) {
          textEl.textContent += word[i];
          await sleep(TYPE_DELAY);
        }
      }

      async function eraseWord() {
        const current = textEl.textContent;
        for (let i = current.length; i > 0; i--) {
          textEl.textContent = current.slice(0, i - 1);
          await sleep(ERASE_DELAY);
        }
      }

      async function showFinalScene() {
        await sleep(600);
        typeContainerEl.style.opacity = "0";
        await sleep(600);

        // 텍스트 영역 초기화
        textEl.textContent = "";

        // 최종 로고 페이드인
        finalLogoEl.classList.add("show");
      }

      async function runSequence() {
        // 처음에는 커서만 깜빡
        textEl.textContent = "";
        await sleep(1000);
        caretEl.classList.remove("hidden");
        await sleep(BEFORE_START_DELAY);

        for (let i = 0; i < words.length; i++) {
          const word = words[i];

          await typeWord(word);

          // 마지막 단어에서는 지우지 않고, 커서를 없애고 최종 장면으로 전환
          if (i === words.length - 1) {
            await sleep(800);
            caretEl.classList.add("hidden");
            await showFinalScene();
          } else {
            await sleep(BETWEEN_WORD_DELAY);
            await eraseWord();
            await sleep(BETWEEN_WORD_DELAY);
          }
        }
      }

      runSequence();
    };