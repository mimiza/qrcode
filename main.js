import QRCode from "qrcode"
import fs from "fs"

const arg = process.argv.splice(2)
const dir = "./codes"

// Check codes folder and create if not exists.
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const url = !isNaN(arg.indexOf("-u")) ? arg[arg.indexOf("-u") + 1] : undefined
const number = !isNaN(arg.indexOf("-n")) ? arg[arg.indexOf("-n") + 1] : 100

const generate = ({ length = 16 } = {}) => {
    let code = ""
    while (code.length < length) code += Math.floor(Math.random() * 10)
    return code
}
