/* eslint-disable no-console */
import fs from "fs"
import axios from "axios"

const SVG_ICON_SCRIPT_URL = "https://at.alicdn.com/t/c/font_3736402_d50r1yq40hw.js"
const SVG_ICON_PREFIX = "vp-icon-"

function getIcons(str) {
    const reg = new RegExp(`id="${SVG_ICON_PREFIX}([^"]+)"`);
    return str.match(/id="([^"]*)"/g).map((item) => item.replace(reg, "$1"));
}

export async function genIconListJson() {
    try {
        const res = await axios.get(SVG_ICON_SCRIPT_URL);
        console.log(res)
        if (res.status === 200) {
            const iconList = getIcons(res.data);
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
