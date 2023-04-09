export class hmNode {
    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    private _id: string
    public contemporaries: Array <string>
    public laterNodes: Array<string>

    constructor(id: string, contemporaries: Array<string>=[], laterNodes: Array<string>=[]) {
        this._id = id
        this.contemporaries = contemporaries
        this.laterNodes = laterNodes
    }
}

class hmLine {
    private nodes: Array<hmNode>
    public id: string = ""
    public next: hmLine |null = null

    constructor() {
        this.nodes=[]
        this.next = null
    }

    //inserts this hmLine object BEFORE the hmLine given as parameter
    public insertBefore(nextLine: hmLine|null) {
        this.next = nextLine
        return this
    }

    //inserts THIS hmLine object AFTER the hmLine given as parameter
    public insertAfter(lineBefore: hmLine) {
        this.next = lineBefore.next
        lineBefore.next = this
    }

    public attachNode(node: hmNode) {
        this.nodes.push(node)
    }

    public getNodesAsString() {
        let s = ""
        for (let n of this.nodes) {
            s += (s!==""?",":"") + n.id
        }
        return s
    }
}

export class hmGraph {
    public _name: string
    private firstLine: hmLine | null
    constructor() {
        this._name = "name"
        this.firstLine = null
    }

    public lines() {
        let line = this.firstLine
        const lines: Array<hmLine> = []
        let c = 0
        while (line) {
            line.id = String(++c)
            lines.push(line)
            line=line.next
        }
        return lines
    }

    addNodes(nodes:Array<hmNode>) {
        while (nodes.length > 0) {
            const node = nodes.pop()
            if (node) {
                const line = new hmLine()
                this.firstLine = line.insertBefore(this.firstLine)
                this.attachNode(line, nodes, node)
            }
        }
    }

    private attachNode(line: hmLine, inNodes: Array<hmNode>, node: hmNode) {
        console.log("attaching node " + node.id)
        line.attachNode(node)
        this.addContemporaries(line, inNodes, node)
        this.addLaterNodes(line, inNodes, node)
    }

    private addContemporaries(line: hmLine, inNodes: Array<hmNode>, node: hmNode) {
        for (const n of node.contemporaries) {
            for (let idx=0;idx<inNodes.length;idx++) {
                const inNode = inNodes[idx]
                if (n === inNode.id) {
                    inNodes.splice(idx,1)
                    this.attachNode(line, inNodes, inNode)
                }
            }
        }
    }

    private addLaterNodes(line: hmLine, inNodes: Array<hmNode>, node: hmNode) {
        for (const n of node.laterNodes) {
            for (let idx=0;idx<inNodes.length;idx++) {
                debugger;
                const inNode = inNodes[idx]
                if (n === inNode.id) {
                    inNodes.splice(idx,1)
                    let laterLine = null
                    if (line.next) {
                        laterLine = line.next
                    } else {
                        laterLine = new hmLine()
                        laterLine.insertAfter(line)
                    }
                    this.attachNode(laterLine, inNodes, inNode)
                }
            }
        }
    }

}