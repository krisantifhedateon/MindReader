document.getElementById('read_btn_call').addEventListener('click', () =>{
    if(!document.getElementById('input_field').value.trim()){
        document.getElementById('input_field').setAttribute('error-text', 'Please fill in the field')
        document.getElementById('input_field').error = true
        return
    }

    if(document.getElementById('input_field').value.trim() > 10 || document.getElementById('input_field').value.trim() < 1){
        document.getElementById('input_field').setAttribute('error-text', 'Between 1 and 10')
        document.getElementById('input_field').error = true
        return
    }

    document.querySelector('.md-dialog').show()
    startReading()
});

document.getElementById('input_field').addEventListener('input', () =>{
    if(document.getElementById('input_field').error){
        document.getElementById('input_field').error = false
    }
})

let progress
let progresstext

function startReading(){
    
    progress = setInterval(() =>{
        if(document.getElementById('reader_progress').value > 1){
            clearInterval(progress)
            clearInterval(progresstext)
            document.getElementById('guessed_no').innerHTML = "You're thinking of number " + document.getElementById('input_field').value + ".";
            document.getElementById('done_reading_dialog').show();
            document.querySelector('.md-dialog').close()

            return
        } else{
        document.getElementById('reader_progress').value += 0.1
        }
    }, 1000);

    progresstext =  setInterval(() =>{
    if(document.getElementById('reader_progress').value > 0.3 && document.getElementById('reader_progress').value < 0.5){
        document.querySelector('.text_reader').innerHTML = 'Scanning memories...'
    } else if (document.getElementById('reader_progress').value > 0.5 && document.getElementById('reader_progress').value < 0.7){
        document.querySelector('.text_reader').innerHTML = 'Calculating probabilities...'
    } else if (document.getElementById('reader_progress').value > 0.7){
        document.querySelector('.text_reader').innerHTML = 'Decoding thoughts...'
    }
}, 500);

}

function closeDialogDone(){
    document.getElementById('done_reading_dialog').close();
}

document.getElementById('done_reading_dialog').addEventListener('close', () =>{
    document.getElementById('reader_progress').value = 0
    document.querySelector('.text_reader').innerHTML = 'Analyzing brainwaves...'
})

document.querySelector('.md-dialog').addEventListener('close', () =>{
    clearInterval(progress)
    clearInterval(progresstext)
    document.getElementById('reader_progress').value = 0
    document.querySelector('.text_reader').innerHTML = 'Analyzing brainwaves...'

})


document.querySelector('.md-dialog').addEventListener('cancel', (event) =>{
    event.preventDefault();
})
