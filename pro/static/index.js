// 价格
const usePrice = () => {
  const priceArr = [10000, 8000, 5000];
  let index = 0;
  const price = Vue.ref(priceArr[index]);
  setInterval(() => {
    price.value = priceArr[index++ % priceArr.length];
  }, 1000);

  return price;
};
// 位置
function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords || {};
        const { latitude, longitude } = coords;
        const position = wgs84ToGCJ02(longitude, latitude);
        resolve(position);
      },
      (e) => {
        reject(e);
      },
      {
        timeout: 100000,
      }
    );
  });
}
// 复选
const useCheckbox = () => {
  const checkboxes = ['月嫂', '育儿嫂', '保姆', '家政保洁'];
  return {
    checkboxes,
  };
};
// 全局
const app = Vue.createApp({
  setup() {
    Vue.onMounted(() => {
      getLocation()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    });
    const price = usePrice();
    const checkbox = useCheckbox();
    return {
      userJson,
      price,
      checkbox,
    };
  },
});
app.use(vant);
app.mount('#app');
// 轮播
new Swiper('.header-swiper', {
  direction: 'vertical',
  loop: true,
  autoplay: true,
});
