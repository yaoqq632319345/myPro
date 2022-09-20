import https from 'https';
import inquirer from 'inquirer';
import axios from 'axios';
import cheerio from 'cheerio';
axios
  .get('https://www.douyin.com/video/7145018222574619939')
  .then(({ data }) => {
    parseHTML(data);
  });

function parseHTML(html) {
  // Implement
  const $ = cheerio.load(html);
  console.log($('body').html());
  $('span').each((i, el) => {
    console.log(el.text());
  });
}
