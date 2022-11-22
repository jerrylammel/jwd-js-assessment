/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const TOTALMINTUES = 1;
  const INTERVAL = 1000;
  let timeRemained;
  let timeStarted;
  let myTimeout;

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const checkQuizTimeOut = () => {
    let currentTime = Date.now();
    let timePassed = Math.floor((currentTime - timeStarted)/1000) * 1000;
    timeRemained -= timePassed;
    timeStarted = currentTime;
  
    if (timeRemained < 0) {
      timeRemained = 0;
    }

    let mins = Math.floor(timeRemained / (60 * 1000));
    let secs = Math.floor(timeRemained % (60 * 1000) / 1000);
    mins = addZero(mins);
    secs = addZero(secs);

    document.getElementById('time').innerHTML = `${mins}:${secs}`;

    // times out
    if (timeRemained <= 0) {
      // trigger click on the submit button
      clearInterval(myTimeout);
      myTimeout = -1;
      document.getElementById('btnSubmit').click();
    }
  }

  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';

    // set initial Time remaning
    document.getElementById('time').innerHTML = `${addZero(TOTALMINTUES)}:00`;
    timeStarted = Date.now();
    timeRemained = TOTALMINTUES * 60 * 1000;
    myTimeout = setInterval(checkQuizTimeOut, INTERVAL); 
  });


    const quizRepo = [
      {
        q : "What is the standard distance between the target and archer in Olympics?",
        o : [
          "50 meters",
          "70 meters",
          "100 meters",
          "120 meters"
        ],
        a : 1 // arrays start with 0, so answer is 70 meters
      },
      {
        q : "Which is the highest number on a standard roulette wheel?",
        o : [
          "22",
          "24",
          "32",
          "36"
        ],
        a : 3
      },
      {
        q : "How much wood could a woodchuck chuck if a woodchuck would chuck wood?",
        o : [
          "400 pounds",
          "550 pounds",
          "700 pounds",
          "750 pounds"
        ],
        a : 2
      },
      {
        q : "Which is the seventh planet from the sun?",
        o : [
          "Uranus",
          "Earth",
          "Pluto",
          "Mars"
        ],
        a : 0
      },
      {
        q : "Which is the largest ocean on Earth?",
        o : [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean"
        ],
        a : 3
      },
      {
        q: 'Which is the third planet from the sun?',
        o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
        a: 1 // array index 1 - so Earth is the correct answer here
      },
      {
        q: 'Which is the largest ocean on Earth?',
        o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        a: 3
      },
      {
        q: 'What is the capital of Australia',
        o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
        a: 1
      },
      {
        q: 'What causes a solar eclipse?',
        o: ['A dog in the sky swallowed the moon', 'The moon went into sleeping', 'The sun stop casting its light to the moon', 'The moon moves between the sun and Earth, casting a shadow on Earth'],
        a: 3
      },
      {
        q: 'Which country is the largest in the world?',
        o: ['United States', 'Canada', 'China', 'Russia'],
        a: 3
      },
      {
        q: 'In 1768, Captain James Cook set out to explore which ocean?',
        o: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
        a: 1
      },
      {
        q: 'What is actually electricity?',
        o: ['A flow of wate', 'A flow of air', 'A flow of electrons', 'A flow of atoms'],
        a: 2
      },
      {
        q: 'Which of the following is not an international organisation?',
        o: ['FIFA', 'NATO', 'ASEAN','FBI'],
        a: 3
      }
    ];

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [];

  // randomly choose 5 questions from the quiz repo
  const tempArr = [...quizRepo];
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * tempArr.length);
    quizArray.push(tempArr[idx]);
    tempArr.splice(idx, 1);
  }

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.setAttribute('style', 'background-color: #67c88d;');
        }

        if (radioElement.checked) {
          // code for task 1 goes here
            if (i === quizItem.a) {
              score += 1;
            }
        }
      }
    });

    const yourScore = document.getElementById('score');
    yourScore.innerText = ` ${score}`;
  };

  const submitBtn = document.getElementById('btnSubmit');
  submitBtn.addEventListener('click', calculateScore);
  const resetBtn = document.getElementById('btnReset');
  resetBtn.addEventListener('click', () => {
    console.log(window.location.href);
    window.location.reload()
  });
  // call the displayQuiz function
  displayQuiz();
});
