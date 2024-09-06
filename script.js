document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById('question');
    const answerButtons = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-btn');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');

    const quizData = [
        {
            question: "Who is the fastest batsman to reach 10,000 runs in ODI cricket?",
            answers: [
                {text: "Virat Kohli", correct: true},
                {text: "Sachin Tendulkar", correct: false},
                {text: "AB de Villiers", correct: false},
                {text: "Chris Gayle", correct: false},
            ]
        },
        {
            question: "Who is the Olympic athlete with the most gold medals won in individual events?",
            answers: [
                {text: "Paavo Nurmi", correct: false},
                {text: "Carl Lewis", correct: false},
                {text: "Michael Phelps", correct: true},
                {text: "Usain Bolt", correct: false},
            ]
        },
        {
            question: "Which of the following Olympic events is no longer included in the modern Olympic Games?",
            answers: [
                {text: "Wrestling", correct: false},
                {text: "Tug of war", correct: true},
                {text: "Gymnastics", correct: false},
                {text: "Swimming", correct: false},
            ]
        },
        {
            question: "Who is the only player to have won the European Cup/Champions League with three different teams as a player?",
            answers: [
                {text: "Zlatan Ibrahimovic", correct: false},
                {text: "Cristiano Ronaldo", correct: false},
                {text: "Andres Iniesta", correct: false},
                {text: "Clarence Seedorf", correct: true},
            ]
        },
        {
            question: "Which bowler has taken the most wickets in international cricket?",
            answers: [
                {text: "Shane Warne", correct: false},
                {text: "Anil Kumble", correct: false},
                {text: "Muttiah Muralitharan", correct: true},
                {text: "Glenn McGrath", correct: false},
            ]
        },
        {
            question: "Which team has won the most UEFA Champions League titles?",
            answers: [
                {text: "Real Madrid", correct: true},
                {text: "AC Milan", correct: false},
                {text: "Liverpool", correct: false},
                {text: "Bayern Munich", correct: false}, 
            ]
        },
        {
            question: "Which city hosted the first-ever Winter Olympic Games?",
            answers: [
                {text: "Chamonix, France", correct: true},
                {text: "St. Moritz, Switzerland", correct: false},
                {text: "Lake Placid, USA", correct: false},
                {text: "Oslo, Norway", correct: false}, 
            ]
        },
        {
            question: "Which of the following football players has won the most Ballon d'Or awards?",
            answers: [
                {text: "Lionel Messi", correct: true},
                {text: "Cristiano Ronaldo", correct: false},
                {text: "Diego Maradona", correct: false},
                {text: "Johan Cruyff", correct: false},
            ]
        },
        {
            question: "Which team has won the most ICC Cricket World Cup titles?",
            answers: [
                {text: "India", correct: false},
                {text: "West Indies", correct: false},
                {text: "Australia", correct: true},
                {text: "England", correct: false},
            ]
        },
        {
            question: "Who is the all-time leading scorer in the Premier League?",
            answers: [
                {text: "Wayne Rooney", correct: false},
                {text: "Thierry Henry", correct: false},
                {text: "Alan Shearer", correct: true},
                {text: "Harry Kane", correct: false},
            ]
        },
        {
            question: "What is the highest individual score in Test cricket?",
            answers: [
                {text: "365*", correct: false},
                {text: "567", correct: false},
                {text: "254", correct: false},
                {text: "400*", correct: true},
            ]
        },
        {
            question: "Which of the following Olympic sports is played on ice?",
            answers: [
                {text: "Field Hockey", correct: false},
                {text: "Curling", correct: true},
                {text: "Volleyball", correct: false},
                {text: "Water Polo", correct: false},
            ]
        },
        {
            question: "Which of the following managers has won the most Premier League titles?",
            answers: [
                {text: "Sir Alex Ferguson", correct: true},
                {text: "Pep Guardiola", correct: false},
                {text: "Jose Mourinho", correct: false},
                {text: "Arsene Wenger", correct: false},
            ]
        },
        {
            question: "Who is the all-time leading run-scorer in international cricket?",
            answers: [
                {text: "Sachin Tendulkar", correct: true},
                {text: "Virat Kohli", correct: false},
                {text: "Sir Viv Richards", correct: false},
                {text: "Don Bradman", correct: false},
            ]
        },
        {
            question: "In which year did the Olympic Games first introduce the torch relay?",
            answers: [
                {text: "1920", correct: false},
                {text: "1932", correct: false},
                {text: "1936", correct: true},
                {text: "1952", correct: false},
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timeLimit = 10;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        nextButton.style.display = 'none';
        feedbackElement.innerHTML = '';
        scoreElement.style.display = 'none';
        timerElement.style.display = 'block';
        showQuestion(quizData[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        answerButtons.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer, button));
            answerButtons.appendChild(button);
        });
        startTimer();
    }

    function startTimer() {
        let timeRemaining = timeLimit;
        timerElement.innerText = `Time Left: ${timeRemaining}s`;
        timer = setInterval(() => {
            timeRemaining--;
            timerElement.innerText = `Time Left: ${timeRemaining}s`;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 1000);
    }

    function handleTimeOut() {
        feedbackElement.innerText = "Time's up!";
        nextButton.style.display = 'block';
    }

    function selectAnswer(answer, button) {
        clearInterval(timer);
        const buttons = answerButtons.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.innerText === answer.text) {
                if (answer.correct) {
                    btn.classList.add('correct');
                    score++;
                } else {
                    btn.classList.add('incorrect');
                }
            } else if (btn.classList.contains('btn')) {
                if (btn.innerText === quizData[currentQuestionIndex].answers.find(ans => ans.correct).text) {
                    btn.classList.add('correct');
                }
            }
        });
        nextButton.style.display = 'block';
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion(quizData[currentQuestionIndex]);
            feedbackElement.innerHTML = '';
            nextButton.style.display = 'none';
        } else {
            showResults();
        }
    }

    function showResults() {
        questionElement.innerText = "Congratulations! You have completed the quiz.";
        answerButtons.innerHTML = '';
        feedbackElement.innerHTML = '';
        scoreElement.innerText = `Your score: ${score} out of ${quizData.length}`;
        scoreElement.style.display = 'block';
        nextButton.style.display = 'none';
        timerElement.style.display = 'none'; 
    }

    nextButton.addEventListener('click', showNextQuestion);

    startQuiz();
});