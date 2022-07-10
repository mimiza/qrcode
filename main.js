import QRCode from "qrcode"
import fs from "fs"

const arg = process.argv.splice(2)
const dir = "./codes"

// Check codes folder and create if not exists.
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

let url = arg.indexOf("-u") > -1 ? arg[arg.indexOf("-u") + 1] : undefined
const number = arg.indexOf("-n") > -1 ? arg[arg.indexOf("-n") + 1] : 100

const generate = ({ length = 16 } = {}) => {
    let code = ""
    while (code.length < length) code += Math.floor(Math.random() * 10)
    return code
}

// Check url for variables.
const pattern = /{([^{}]+?)}/

for (let i = 1; i <= number; i++) {
    let matches
    let content = url
    while ((matches = pattern.exec(content)) !== null) {
        const options = {}
        matches[1].split(",").forEach(item => {
            item = item.split(":")
            options[item[0].trim()] = Number(item[1].trim()) || item[1].trim()
        })
        content = content.replace(matches[0], generate(options))
    }
    console.log(`Code #${i}: ${content}`)
    QRCode.toFile(`${dir}/${i}.svg`, content, { type: "svg" })
}
