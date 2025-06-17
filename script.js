const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const messegeElement = document.getElementById('messege');
const scoreElement = document.getElementById('score');
const optionButtons = document.querySelectorAll('.option'); // Mendapatkan semua tombol opsi

let num1;
let num2;
let correctAnswer;
let score = 0;

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1; // Angka acak antara 1 dan 10
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 * num2;
    questionElement.textContent = `${num1} x ${num2} = ?`;
    
    // Membuat array pilihan jawaban (satu jawaban dan tiga acak lainnya)
    const choices = [correctAnswer];
    while (choices.length < 4) {
      const randomAnswer = Math.floor(Math.random() * 100) + 1; // Jawaban acak 
      if (!choices.includes(randomAnswer)) {
        choices.push(randomAnswer);
      }
    }

    // Mengacak urutan pilihan jawaban
    shuffleArray(choices);

    // Menetapkan teks pada tombol opsi dan menandai jawaban yang benar
    optionButtons.forEach((button, index) => {
        button.textContent = choices[index];
        button.dataset.answer = (choices[index] === correctAnswer). toString();
        button.classList.remove('correct', 'incorrect'); // Reset styling
    });

    messegeElement.textContent = ''; // Kosongkan pesan
}

function chekAnswer(event) {
    const selectedButton = event.target;
    const userAnswer = parseInt(selectedButton.textContent);
    const isCorrect = selectedButton.dataset.answer === 'true';

    // Menonaktifkan semua tombol setelah pemain menjawab
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        messegeElement.textContent = 'Correct';
        messegeElement.className = 'Correct';
        selectedButton.classList.add('correct');
        score++;
        scoreElement.textContent = score;
    } else {
        messegeElement.textContent = `Incorrect. The answer is ${correctAnswer}.`;
        messegeElement.className = 'Incorrect';
        selectedButton.classList.add('Incorrect');
        // Menandai jawaban yang benar setelah jawaban yang salah
        optionButtons.forEach(button => {
            if (button.dataset.answer === 'true') {
                button.classList.add('Correct');
            }
        });
    }

// Menunggu sebentar sebelum menampilkan soal berikutnya
setTimeout(generateQuestion, 1500);
}

// Fungsi untuk mengacak array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Menambahkan event listener ke setiap tombol opsi
optionButtons.forEach(button => {
    button.addEventListener('click', chekAnswer);
});

// Memulai game dengan soal pertama
generateQuestion();