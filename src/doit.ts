import {hmNode} from "./hm.ts";

export function doit() {
    const hm = document.getElementById("hm")
    let data = []
    data.push(new hmNode("6",[],[]))
    data.push(new hmNode("5",[],["6"]))
    data.push(new hmNode("4",["3","1"],["5"]))
    data.push(new hmNode("3",["4","1"],[]))
    data.push(new hmNode("1",["3","1"],["6"]))

    // @ts-ignore
    hm.inNodes = data
}
