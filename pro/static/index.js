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
const useLocation = () => {
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
  Vue.onMounted(() => {
    getLocation()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
};
// 复选
const useCheckbox = () => {
  const checkboxes = ['月嫂', '育儿嫂', '保姆', '家政保洁'];
  return {
    checkboxes,
  };
};
// 轮播;
const useInfo = () => {
  const data = [
    {
      name: '豆小包妈咪',
      age: '育2月',
      p: ' 我是通过妈妈网找到月嫂姚阿姨，姚阿姨是上海本地人，做事很勤快，而且超级爱干净。这点很深得我心，姚阿姨话不多，但是对宝宝的照顾可谓是无微不至，还会和我讲育儿的技巧，我是双月子，姚阿姨教会了很多，以至于到现在宝宝6个多月，也没有遇到什么很难处理的问题。阿姨做菜色香味俱全，我真的觉得能遇到这个月嫂是运气好！月子下来身体也没有什么不适应，没有别人说的腰酸之类的~如果我有二胎我还是会找姚阿姨！ ',
    },
    {
      name: '家有萌娃蒲优',
      age: '育2月',
      p: ' 生孩子的时候，张阿姨就来医院陪护了，那几天也是多亏了张阿姨的陪护，家里人手忙脚乱，都不知道做什么，我刚生产完话都说不出来，都是张阿姨在照顾我和宝宝。真的很专业的，喂奶姿势、乳房护理按摩、宝宝护理喂奶辅助、做月子餐都很靠谱，完全不用我和家里人操心。因为有张阿姨的护理，这个月子坐得很好，也没有碰到什么问题，太太太感谢张阿姨了！身边如果有朋友要找月嫂，我都第一时间想到张阿姨！',
    },
    {
      name: '芮芮哒翔宝',
      age: '育4月',
      p: ' 新手爸妈手忙脚乱的不行，快生的时候才急急忙忙开始找月嫂，还好有朋友推荐，沟通之后定下来李阿姨，非常感谢她能在疫情最严重的时候来到我家，阿姨在我家一直戴着口罩，十分注重卫生和安全，真的让人非常安心了，因为我是剖腹产，月子里伤口特别疼，还好有李阿姨精心的照料，不然我要受不少罪了。李阿姨特别温柔，没事就陪我说话解闷，对宝宝也很好，能找到这样的月嫂，真的很满意！',
    },
    {
      name: '牧爸爸',
      age: '育2月',
      p: ' 月嫂机构给我推荐了曾姐，一开始对陌生的月嫂来家里照顾宝宝有些不放心，经过几天的接触我就彻底放下心了，曾阿姨不仅月子餐做的好，对宝宝也特别有耐心，做操、按摩、早教、唱儿歌……除了给我做饭照顾我之外，其余的时间基本上都是在陪宝宝，彻底解放了我婆婆，有了曾姐，她乐的轻松自在。整个月子，在曾姐的照料下我几乎没有任何不适，除了头两天伤口有点疼痛，之后都是吃的香睡得好，我们全家人都对曾姐特别满意！如果我生二胎一定再找曾姐！',
    },
    {
      name: '月韵梦影影',
      age: '育1月',
      p: ' 我是二胎妈妈，第一胎的时候，年纪轻没请月嫂，真心觉得累，因为没人指导，所以养娃之路上走了不少弯路。这次二胎，果断找了月嫂，真心觉得月嫂很有必要。照顾我的是戴阿姨，不仅饭烧的好吃，照顾起宝宝也是经验十足。月子里面我的胃口相当好，这要归功于戴阿姨，关键是我每天吃这么多，也没怎么长胖，奶水充足的，每天戴阿姨会陪着我和宝宝出门逛30分钟，让我坚持运动。基本在这两个月里，我没怎么操心，休息的很充分，身体也比一胎的时候好很多~',
    },
  ];
  return data;
};
const useForm = () => {
  const form = Vue.ref({
    checked: [],
    phone: '',
    date: '',
  });
  return form;
};
// 时间
const usePicker = () => {
  const dateShow = Vue.ref(false);
  const cityShow = Vue.ref(false);
  return {
    dateShow,
    cityShow,
    dateShowPicker() {
      dateShow.value = !dateShow.value;
    },
    cityShowPicker() {
      cityShow.value = !dateShow.value;
    },
  };
};
const useBtn = () => {
  const showBottomBtn = Vue.ref(false);
  const checkTop = () => {
    const scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    console.log(scrollTop);
    if (scrollTop > 1200) {
      showBottomBtn.value = true;
    } else {
      showBottomBtn.value = false;
    }
  };
  Vue.onMounted(() => {
    checkTop();
    window.addEventListener('scroll', checkTop);
  });
  return showBottomBtn;
};
// 全局
const app = Vue.createApp({
  setup() {
    const form = useForm();

    const submit = () => {
      console.log(form.value);
      axios.post('/url', form.value).then(() => {});
      vant.Dialog({ message: '提交成功' });
    };

    return {
      userJson,
      cityJson,
      price: usePrice(),
      checkbox: useCheckbox(),
      data: useInfo(),
      ...usePicker(),
      showBottomBtn: useBtn(),
      submit,
      form,
    };
  },
});
app.use(vant);
app.mount('#app');
