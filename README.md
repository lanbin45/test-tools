# test-tools
A CT test tools for CFDA
前（Angular5）后（Express）端分离的应用设计.

# 使用
## 前端
1. 安装 [Angular-cli](https://github.com/angular/angular-cli/blob/master/README.md)
2. `cd client`
3. `cnpm install` 安装packages
4. Debug 运行`ng serve --proxy-config debug-config.json` 转发请求到9817端口;
   Build 运行`ng build --prod --no-extract-licenses` 将生成的dist目录拷贝到server根目录，或者运行deploy_client.bat 拷贝dist到server 根目录

## 后端
1. `cd lib`
2. `node CTSimulatorTestTool.js`
