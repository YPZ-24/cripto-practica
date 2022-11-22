let txtGuardado
let animationFlashStartCode
const btnCifrar = document.querySelector('#btnCifrar')
const btnDescifrar = document.querySelector('#btnDescifrar')
const pError = document.querySelector('#pError')
const pInfo = document.querySelector('#pInfo')
const inText = document.querySelector('#inText')
const pResultado = document.querySelector('#pResultado')
const conte = document.querySelector('#conte')
btnCifrar.onclick = () => cifrar(true)
btnDescifrar.onclick = () => cifrar(false)
inText.onkeyup = cambiarText

main()

function main(){
    animationFlashInText()
}

function cambiarText(){
    if(inText.value.length < txtGuardado?.length) {
        pError.textContent = ""
        pInfo.textContent = ""
        pResultado.textContent = ""
    }
    if(inText.value.length > 0) animationFlashStart('icon-flash')
    else animationFlashStop()
}

function cifrar(cifrando){
    const txt = inText.value
    txtGuardado = txt
    let resultado, error, info
    try{
        resultado = cifrando ? btoa(txt) : atob(txt)
        navigator.clipboard.writeText(resultado)
        info = "Copiado!"
    }catch(e){
        console.log(e)
        error = "Ocurrio un Error, Intenta más tarde"
    }finally{
        pResultado.textContent = resultado ? resultado : ""
        pError.textContent = error ? error : ""
        pInfo.textContent = info ? info : ""
        if(info){
            setTimeout(() => {
                pInfo.textContent = ""
            }, 1500);
        }
    }
}

function animationFlashStart(idElement){
    const element = document.querySelector(`#${idElement}`)
    element.style.visibility = 'visible'
    if(!animationFlashStartCode){
        animationFlashStartCode = setInterval(() => {
            element.style.visibility = (element.style.visibility == 'visible') ? 'hidden' : 'visible'
        }, 350);
    }
}

function animationFlashStop(){
    clearInterval(animationFlashStartCode)
    animationFlashStartCode = null
}

function animationFlashInText(){
    let cifrar = true
    setInterval(() => {
        inText.placeholder = `Escribe para ${cifrar ? 'cifrar' : 'descrifrar'}`.toUpperCase()
        cifrar = !cifrar
    }, 500);
}