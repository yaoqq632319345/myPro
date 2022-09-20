import nodeXlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sheetHead = ['昵称', '粉丝', '获赞', '标题', '时间' /* '第一条评论' */];
const data = [sheetHead];
// 浏览器
const browers = await puppeteer.launch({ headless: false });

async function getDataByUrls() {
  const urls = [
    'https://www.douyin.com/video/7145018222574619939',
    'https://v.douyin.com/6m6J2kD/',
  ];
  for await (const url of urls) {
    const item = await getData(url);
    data.push(item);
  }
}
(async function () {
  await getDataByUrls();
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
// 根据url获取单页数据
async function getData(url) {
  const page = await browers.newPage();
  await page.goto(url);
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
  // 评论信息
  const commetInfo = await body.$('div[data-e2e="comment-item"]');
  const commeTxt = commetInfo
    ? await commetInfo.$eval('.VD5Aa1A1', (node) => node.innerText)
    : '';
  return [name, fans, like, title, date /* commeTxt */];
}
