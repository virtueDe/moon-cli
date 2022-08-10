const inquirer = require("inquirer");
const downloadGitRepo = require("download-git-repo");
const chalk = require("chalk");
const util = require("util");
const path = require("path");
const { loading } = require("./util");
const { TempRepoUrl } = require("./Constant");
const fs = require("fs-extra");
const ora = require("ora");

class Creator {
  constructor(projName, tempName) {
    this.projName = projName;
    this.tempName = tempName;
    this.dest = path.resolve(process.cwd(), this.projName)
    // 转化为 promise 方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  // 创建项目部分
  async create() {
    await this.download();
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.projName)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.projName)}`);
    console.log("  npm install");
    // console.log("  npm run serve\r\n");
  }
  // 下载git仓库
  download() {
    const { tempName, dest } = this
    // 模板下载地址
    const templateUrl = `${TempRepoUrl}#${tempName}`;

    const spinner = ora(`正在下载项目模板，源地址：${templateUrl}`)
    spinner.start()
    return new Promise((resolve, reject) => {
      downloadGitRepo(templateUrl, dest, { clone: false }, (err) => {
        if (err) {
          spinner.fail()
          console.log(chalk.red("模板下载失败:("));
          reject(err)
        } else {
          spinner.succeed()
          console.log(chalk.green("模板下载完毕:)"));
          resolve()
        }
      })
    })
  }
}

module.exports = Creator;
