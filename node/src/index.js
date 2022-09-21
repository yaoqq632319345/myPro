import nodeXlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function sleep(time = 5000) {
  console.log('休息时间.........');
  return new Promise((res) => {
    setTimeout(res, time);
  });
}

const sheetHead = ['昵称', '粉丝', '获赞', '标题', '时间'];
const data = [sheetHead];
// 浏览器
const browers = await puppeteer.launch({ headless: false });
const page = await browers.newPage();

// 获取地址
async function getUrls() {
  const data = nodeXlsx.parse(path.join(__dirname, '快手.xlsx'));
  let urls;
  data.forEach((sheet) => {
    const list = sheet.data;
    urls = list.flat(1);
  });
  const res = (urls || [])
    .map((url) => `https${url.split('https')[1].split(' ')[0]}`) // 去除左右两侧汉字
    .filter((url) => !url.includes('/user')); // 去除用户主页
  return res;
}

// 根据地址组装数据
async function getDataByUrls(urls) {
  console.log(`共${urls.length}条数据`);
  for await (const url of urls) {
    console.log(`正在处理${urls.indexOf(url)}/${urls.length}.......`);
    const item = await getDataKkuz(url);
    data.push(item);
  }
}
(async function () {
  const urls = await getUrls();
  await getDataByUrls(urls);
  createXlsx(data);
  browers.close();
})();

// 创建xlsx
function createXlsx(data) {
  var buffer = nodeXlsx.build([{ name /* sheetName */: '抖音', data }]);
  const fileDir = path.join(__dirname, `../xlsx`);
  const filePath = path.join(fileDir, `${new Date().getTime()}.xlsx`);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);
  fs.writeFileSync(filePath, buffer);
}

// 根据url获取单页数据 抖音
async function getData(url) {
  await page.goto(url);
  try {
    const body = await page.$('body');
    // 用户信息模块
    const userInfo = await body.$('div[data-e2e="user-info"]');
    const name = await userInfo.$eval('.Nu66P_ba', (node) => node.innerText);
    const fans = await userInfo.$eval('.EobDY8fd', (node) => node.innerText);
    // 视频信息模块
    const videoInfo = await body.$('div[data-e2e="detail-video-info"]');
    const like = await videoInfo.$eval('.CE7XkkTw', (node) => node.innerText);
    const title = await videoInfo.$eval('.new-pmd', (node) => node.innerText);
    const date = await videoInfo.$eval('.aQoncqRg', (node) => node.innerText);
    await sleep();
    return [name, fans, like, title, date];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}

async function getDataKkuz(url) {
  await page.goto(url);
  try {
    const body = await page.$('body');
    // 用户信息模块
    const name = await body.$eval(
      '.profile-user-name-title',
      (node) => node.innerText
    );
    const like = await body.$eval('.item-count', (node) => node.innerText);
    const fans = '快手没有关注数';
    // 视频信息模块
    const title = await body.$eval(
      '.video-info-title',
      (node) => node.innerText
    );
    const date = await body.$eval(
      '.video-info-text',
      (node) => `发布时间${node.innerText.split('发布时间')[1]}`
    );
    await sleep();
    console.log([name, fans, like, title, date]);
    if (name) {
      return [name, fans, like, title, date];
    }
    return ['报错了：', url];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}
