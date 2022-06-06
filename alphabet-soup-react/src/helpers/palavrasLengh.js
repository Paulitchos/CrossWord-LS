const palvrasLengh = (palavras,maxLengh) => {
    console.log(palavras)
    
    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].length > maxLengh ){
            return false;
        } 
    }

    return true;
};

export default palvrasLengh;
