const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("./Creator");
const { loading } = require("./util");



const templateOptions = {
  "cr-proj": [
    { name: "vue3 (vite+element-plus)", value: 'https://github.com/virtueDe/admin-template.git' },
    { name: "vue2 (vue-cli+element)", value: 'https://github.com/virtueDe/admin-template.git' },
  ],
  "cr-lib": [
    { name: "vue-lib", value: 'https://github.com/virtueDe/admin-template.git' },
    { name: "js-lib", value: 'https://github.com/virtueDe/admin-template.git' },
  ],
}


module.exports = async function (projectName, options, commandName) {
  // let { template } = await new Inquirer.prompt([
  //   // 返回值为promise
  //   {
  //     name: "template", // 与返回值对应
  //     type: "list", // list 类型
  //     message: "选择模版",
  //     choices: templateOptions[commandName],
  //   },
  // ]);
  // console.log(template);
  // // return
  // // 获取当前工作目录
  // const cwd = process.cwd();
  // const targetDirectory = path.join(cwd, projectName);
  
  // if (fs.existsSync(targetDirectory)) {
  //   if (options.force) {
  //     // 删除重名目录
  //     await fs.remove(targetDirectory);
  //   } else {
  //     let { isOverwrite } = await new Inquirer.prompt([
  //       // 返回值为promise
  //       {
  //         name: "isOverwrite", // 与返回值对应
  //         type: "list", // list 类型
  //         message: "Target directory exists, Please choose an action",
  //         choices: [
  //           { name: "Overwrite", value: true },
  //           { name: "Cancel", value: false },
  //         ],
  //       },
  //     ]);
  //     if (!isOverwrite) {
  //       console.log("Cancel");
  //       return;
  //     } else {
  //       await loading(
  //         `Removing ${projectName}, please wait a minute`,
  //         fs.remove,
  //         targetDirectory
  //       );
  //     }
  //   }
  // }

  // 创建项目
  // const creator = new Creator(projectName, targetDirectory);
  const creator = new Creator(projectName, 'https://github.com/virtueDe/admin-template');

  creator.create();
};
