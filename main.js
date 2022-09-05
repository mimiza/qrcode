import QRCode from "qrcode"
import fs from "fs"

const arg = process.argv.splice(2)
const dir = "./codes"

// Check codes folder and create if not exists.
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

let data = arg.indexOf("-d") > -1 ? arg[arg.indexOf("-d") + 1] : "data.json"
if (data && fs.existsSync(data)) {
    data = fs.readFileSync(data)
    try {
        data = JSON.parse(data)
    } catch {}
}

const url = arg.indexOf("-u") > -1 ? arg[arg.indexOf("-u") + 1] : undefined
const number = arg.indexOf("-n") > -1 ? arg[arg.indexOf("-n") + 1] : Array.isArray(data) ? data.length : 100
const options = { type: "svg", margin: 1, width: 200 }

// Extend options if possible.
if (arg.indexOf("-o") > -1)
    arg[arg.indexOf("-o") + 1].split(",").forEach(item => {
        item = item.split(":")
        options[item[0].trim()] = Number(item[1].trim()) || item[1].trim()
    })

// Generate random a integer number with given length.
const random = ({ length = 16 } = {}) => {
    let code = ""
    while (code.length < length) code += Math.floor(Math.random() * 10)
    return code
}

for (let i = 0; i < number; i++) {
    const code = Array.isArray(data) ? data[i] : undefined
    const name = code?.name || i + 1
    let matches
    let content = code?.url || url
    // Check url for variables. If variables exist, try to replace them.
    while ((matches = /{([^{}]+?)}/.exec(content)) !== null) {
        const options = {}
        matches[1].split(",").forEach(item => {
            item = item.split(":")
            options[item[0].trim()] = Number(item[1].trim()) || item[1].trim()
        })
        content = content.replace(matches[0], random(options))
    }
    console.log(`Code #${name}: ${content}`)
    QRCode.toFile(`${dir}/${name}.${options.type}`, content, options)
}
