import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "node:path";
import process from "node:process";

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild,
  });
}
