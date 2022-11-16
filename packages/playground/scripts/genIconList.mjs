/* eslint-disable no-console */
import fs from "fs"
import axios from "axios"

// 致敬喷子，自我改进
const SVG_ICON_SCRIPT_URL = "https://at.alicdn.com/t/c/font_3736402_d50r1yq40hw.json"

export async function genIconListJson() {
    try {
        const res = await axios.get(SVG_ICON_SCRIPT_URL);
        
        if (res.status === 200) {
            console.log()
            const iconList = res.data.glyphs.map(item => item.name)
            console.log(iconList);
            fs.writeFile(new URL("../src/assets/json/icons.json", import.meta.url), JSON.stringify(iconList, null, 2), function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("图标清单写入成功！");
            });
        } else {
            console.error(res.status, res.statusText);
        }
    } catch (err) {
        console.error(err);
    }
}

genIconListJson();
