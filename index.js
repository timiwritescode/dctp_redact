// function to redact a word
const textArea = document.getElementById('text');
const submitBtn =  document.querySelector('button');
// const wordToRedact = document.querySelector('#redact-word').value;
const hideToolbarBtn = document.querySelector('.hide-btn')
const addBtn = document.querySelector('.add-button')

submitBtn.addEventListener('click', () => {
   
    const text = new Text(textArea.value)     

    textArea.value = text.redactText(['e', 'a', 's'], '*') 
    text.createAnalysis(document.querySelector('.main'))
});


hideToolbarBtn.addEventListener('click', () => {
    const aside = document.querySelector('aside');

    aside.classList.add("hide-toolbar")
})


addBtn.addEventListener('click', () => {
    let letterToRedact = prompt("Add a letter to redact");
    if (letterToRedact.length > 1) {
        alert('Only select one letter or character')

        return
    } elif (letter)
    addWordToRedactToUi(letterToRedact)
})

// function to make users add word to redact
function addWordToRedactToUi (word) {
    const wordsToRedact = document.querySelector('.words-to-redact');
    const para = document.createElement('p');
    para.classList.add('word-to-redact')
    para.textContent = word;
    wordsToRedact.appendChild(para)
}


class Text {
    constructor (text) {
        this.text = text
        this._numberOfWords = this.text.split(' ').length
        this._numberOfCharacters = this.text.length
    }
    
    getNumberOfCharactersInText () {
        return this._numberOfCharacters
    }

    getNumberOfWordsInText () {
        return this._numberOfWords
    }

    analyzeText(params) {
        
    }

    createAnalysis(parentElement) {
        const analysisElement = document.createElement('div');
        analysisElement.classList.add('analysis');
        const analysisPara = document.createElement('p');
        analysisPara.textContent = `${this._numberOfWords} words scanned, ${this._numberOfCharacters} characters scanned`
        analysisElement.appendChild(analysisPara);

        // append to parent
        parentElement.appendChild(analysisElement)
    }    

    redactText(filter, redacter='*') {
        let redactedText = ''
        console.log(this.text)
        for (let i = 0; i < this.text.length; i++) {
            if(filter.includes(this.text[i])) {
                redactedText+= redacter
            } else {
                redactedText += this.text[i]
            }
        }
        return redactedText        
    }    
}