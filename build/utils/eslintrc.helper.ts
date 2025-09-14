import path from "node:path";
import fs from 'node:fs'

const jsonFile = path.join(process.cwd(),'.eslintrc-global-types.json');

export function readEslintGlobals(){

  if(!fs.existsSync(jsonFile)){
    fs.writeFileSync(jsonFile,`${JSON.stringify({globals:{}},null,2)}`,{encoding:'utf8'})
  }
  let eslintrcJson = {}

  try {
    eslintrcJson = JSON.parse(fs.readFileSync(jsonFile,{encoding:'utf8'}))?.globals ||{}
  } catch {
    // ignore error.
  }

  return eslintrcJson
}
