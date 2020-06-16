export function getMonth():string {
    let result = "spring";
    let month=new Date().getMonth();
    if(month<6&&month>=3){
        return result="summer"
    }else if(month<9){
        return result="autumn"
    }else if(month<12){
        return result="winter"
    }
    return result;
}
  