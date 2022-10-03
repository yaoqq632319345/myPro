import nodeXlsx from 'node-xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
const iPhone = puppeteer.devices['iPhone 6'];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sheetHead = ['昵称', '粉丝', '获赞', '标题', '时间', '地址', '播放量'];
const data = [sheetHead];
// 浏览器
const browers = await puppeteer.launch({ headless: false });
// const browers = await puppeteer.connect({
//   browserWSEndpoint:
//     'ws://127.0.0.1:9222/devtools/browser/2f8363cd-926e-498c-b270-999708b3dd98',
// });
const page = await browers.newPage();
page.setViewport({ width: 1800, height: 1600 });

// 主程序
(async function () {
  const urls = await getUrls();
  await getDataByUrls(urls);
  createXlsx(data);
  browers.close();
})();

// ======================== 方法
// 获取地址
async function getUrls() {
  const data = nodeXlsx.parse(path.join(__dirname, '随便.xlsx'));
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
    if (url.includes('douyin')) {
      await action(url, '抖音数据', getDataDzyb);
    } else if (url.includes('kuaishou')) {
      await action(url, '快手', getDataKkuz);
    } else if (url.includes('ixigua')) {
      await action(url, '西瓜', getDataXigx);
    } else if (url.includes('bilibili') || url.includes('.tv')) {
      await action(url, 'b站', getDataB);
    } else {
      console.log('啥也不是的地址：', url);
    }
  }

  async function action(url, str, method) {
    try {
      console.log(str, url);
      const item = await method(url);
      data.push(item);
    } catch (error) {
      console.log('=====================', error);
      data.push(['=============================又报错了：', url]);
    }
  }
}

// 创建xlsx
function createXlsx(data) {
  var buffer = nodeXlsx.build([{ name /* sheetName */: 'sheetName', data }]);
  const fileDir = path.join(__dirname, `../xlsx`);
  const time = new Date();
  const name = `${time.getHours()}：${time.getMinutes()}`;
  const filePath = path.join(fileDir, `${name}.xlsx`);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);
  fs.writeFileSync(filePath, buffer);
}

// 根据url获取单页数据 抖音
async function getDataDzyb(url) {
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
    const title = await videoInfo.$eval('h1', (node) => node.innerText);
    const date = await videoInfo.$eval('.aQoncqRg', (node) => node.innerText);
    await sleep();
    return [name, fans, like, title, date, url];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}
// 快手
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
    if (name) {
      return [name, fans, like, title, date, url];
    }
    return ['报错了：', url];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}

// 西瓜
async function getDataXigx(url) {
  await page.goto(url);

  try {
    const body = await page.$('body');
    await sleep();
    // 用户信息模块
    const name = await body.$eval(
      '.author__userName',
      (node) => node.innerText
    );
    const like = await body.$eval(
      '.video_action_item--like',
      (node) => node.innerText
    );
    const fans = await body.$eval(
      '.author_statics span',
      (node) => node.innerText
    );
    // 视频信息模块
    const title = await body.$eval('.videoTitle', (node) => node.innerText);
    const date = await body.$eval(
      '.videoDesc__publishTime',
      (node) => node.innerText
    );
    await sleep();
    console.log([name, fans, like, title, date, url]);
    if (name) {
      return [name, fans, like, title, date, url];
    }
    return ['报错了：', url];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}

// b站
async function getDataB(url) {
  await page.goto(url);

  try {
    const body = await page.$('body');
    // 用户信息模块
    const name = await body.$eval('.username', (node) => node.innerText);
    const like = await body.$eval(
      'span.like .info-text',
      (node) => node.innerText
    );
    const fans = await body.$eval('.has-charge', (node) =>
      parseInt(node.innerText.split('关注')[1])
    );
    // 视频信息模块
    const title = await body.$eval('.video-title', (node) => node.innerText);
    const date = await body.$eval(
      '.pudate-text',
      (node) => `发布时间${node.innerText}`
    );
    const playNum = await body.$eval(
      '.video-data-list .view',
      (node) => node.innerText
    );
    await sleep();
    if (name) {
      return [name, fans, like, title, date, url, playNum];
    }
    return ['报错了：', url];
  } catch (error) {
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}

// 小红书
async function getDataXnhsuu(url) {
  await page.emulate(iPhone);
  await sleep();
  await page.goto(url);

  try {
    const body = await page.$('body');
    // 用户信息模块
    const name = await body.$eval('.author-username', (node) => node.innerText);
    const like = await body.$eval(
      '.action-button .rf-n',
      (node) => node.innerText
    );
    const fans = '小红书也没有关注数';
    // 视频信息模块
    const title = await body.$eval('.author-desc', (node) => node.innerText);
    const date = '小红书没有发布时间';
    await sleep();
    console.log(nam, fans, like, title, date, url);
    await page.setViewport({
      width: 640,
      height: 480,
      deviceScaleFactor: 1,
      isMobile: false,
    });
    if (name) {
      return [name, fans, like, title, date, url];
    }
    return ['报错了：', url];
  } catch (error) {
    await page.setViewport({
      width: 640,
      height: 480,
      deviceScaleFactor: 1,
      isMobile: false,
    });
    console.error('有条数据报错了：', url, error.message);
    await sleep();
    return ['报错了：', url];
  }
}
// 等待
async function sleep(time = 2000) {
  console.log('休息时间.........');
  return new Promise((res) => {
    setTimeout(res, time);
  });
}
