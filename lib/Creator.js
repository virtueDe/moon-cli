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
    await this.update();
    // 模板使用提示
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.projName)}`);
    console.log(`\r\n  cd ${chalk.cyan(this.projName)}`);
    console.log("  npm install");
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
  // package.json
  async update() {
    const { name, version } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'package.json中的name:',
        default: this.projName
      },
      {
        type: 'input',
        name: 'version',
        message: 'package.json中的version:',
        default: '0.0.1'
      }
    ])
    const spinner = ora(`正在更新package.json的配置`)
    spinner.start();
    const packageDest = path.resolve(this.dest, 'package.json');
    const data = fs.readFileSync(packageDest).toString();
    let packageJson = JSON.parse(data);
    packageJson.name = name;
    packageJson.version = version;
    fs.writeFileSync(packageDest, JSON.stringify(packageJson, null, '\t'), 'utf-8');
    spinner.succeed()
  }
}

module.exports = Creator;
