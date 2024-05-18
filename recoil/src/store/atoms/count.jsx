import {atom,selector} from "recoil";

export const countAtom=atom({
    key:"count",
    default:0
})

export const evenSelector=selector({
    key:"evenSelector",
    get:({get})=>{
        const count=get(countAtom)
        if(count!==0){
        return (count%2)==0
        }
    }
})