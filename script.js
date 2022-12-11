const searchBtn = document.querySelector("button");
const wordSearched = document.querySelector(".word-searched");
const partOfSpeechEl = document.querySelector(".word-fig");
const phoneticsEl = document.querySelector(".phonetics");
const inputWord = document.querySelector("input");
const definitionEl = document.querySelector(".meaning");
const exampleEl = document.querySelector(".use");
const synonymsEl = document.querySelector(".synonym");
const containerEl = document.querySelector(".container");
const speakerBtn = document.querySelector(".sound span");

const urlApi = `https://api.dictionaryapi.dev/api/v2/entries/en/`;

searchBtn.addEventListener('click', () => {
    if (inputWord.value) {
        fetchWordMeaning(inputWord.value);
    }
    else {
        alert("Input Field is empty");
    }
    inputWord.value = '';
})

function fetchWordMeaning(word) {
    fetch(`${urlApi}${word}`)
        .then(res => res.json()).
        then(result => {

            if (result.length >= 1) {

                let results = result[0].meanings[0].definitions[0];

                let word = result[0].word;
                let partOfSpeech = result[0].meanings[0].partOfSpeech;
                let phonetic = result[0].phonetic;
                let definition = results.definition;
                let syns = results.synonyms;
                let example = results.example;
                let li = document.createElement('li');


                if (syns.length >= 1) {
                    if (syns) {
                        syns.forEach(syn => {
                            synonymsEl.textContent = '';

                            let tag = `<li>${syn}, </li>`;
                            li.insertAdjacentHTML('beforeend', tag);
                            synonymsEl.appendChild(li);
                        })
                    }
                }
                else {
                    synonymsEl.textContent = '';
                }
                wordSearched.innerHTML = word;
                partOfSpeechEl.textContent = partOfSpeech;
                phoneticsEl.innerHTML = phonetic;
                definitionEl.textContent = definition;
                exampleEl.textContent = example;
            }
            else {
                alert('Cannot find word');
            }
        }).catch(err => console.log(err));
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    } else {
        alert("Browser doesn't support speech utterance");
    }
}
speakerBtn.addEventListener('click', () => {
    speakText(containerEl.textContent);
});