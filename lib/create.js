const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");
const { loading } = require("./util");



const tempOptions = [
  { name: "vue3 (vue3 + vite) 项目模版", value: 'vue3' },
  { name: "ts (rollup + ts ) ts 库模版", value: 'ts' },
]
// {
// "cr-proj": [
//   { name: "vue3 (vite+element-plus)", value: 'https://github.com/virtueDe/admin-template.git' },
//   { name: "vue2 (vue-cli+element)", value: 'https://github.com/virtueDe/admin-template.git' },
// ],
// "cr-lib": [
//   { name: "vue-lib", value: 'https://github.com/virtueDe/admin-template.git' },
//   { name: "js-lib", value: 'https://github.com/virtueDe/admin-template.git' },
// ],
// }


module.exports = async function (projectName, options) {
  let { temp } = await new Inquirer.prompt([
    // 返回值为promise
    {
      name: "temp", // 与返回值对应
      type: "list", // list 类型
      message: "选择要创建的项目模版",
      choices: tempOptions,
    },
  ]);

  // 获取当前工作目录
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      // 删除重名目录
      await fs.remove(targetDirectory);
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        // 返回值为promise
        {
          name: "isOverwrite", // 与返回值对应
          type: "list", // list 类型
          message: "目标目录存在，是否覆盖",
          choices: [
            { name: "是", value: true },
            { name: "否", value: false },
          ],
        },
      ]);
      if (!isOverwrite) {
        console.log("Cancel");
        return;
      } else {
        await loading(
          `删除中 ${projectName}...`,
          fs.remove,
          targetDirectory
        );
      }
    }
  }

  // 创建项目
  const creator = new Creator(projectName, temp);

  creator.create();
};
