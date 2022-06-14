const palavrasLengh = (palavras,maxLengh) => {
    
    for (let i = 0; i < palavras.length; i++) {
        if (palavras[i].length > maxLengh ){
            return false;
        } 
    }

    return true;
};

export default palavrasLengh;
