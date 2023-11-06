// function to redact a word
const textArea = document.getElementById('text');
const submitBtn =  document.querySelector('button');
const wordToRedact = document.querySelector('#redact-word').value;

submitBtn.addEventListener('click', () => {
   
    const text = new Text(textArea.value)     

    if (!document.querySelector('#redacted-text')) {
        const newTextArea = document.createElement('textarea');
        newTextArea.id = 'redacted-text'
        document.body.append(newTextArea)
    }   

    const redactWordTextArea = document.querySelector('#redacted-text')
    redactWordTextArea.value = text.redactText(['e', 'a', 's'], '*') 
    text.createAnalysis(document.querySelector('.main'))
});


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