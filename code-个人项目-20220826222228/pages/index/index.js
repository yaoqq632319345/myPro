function useForm() {
  const form = Vue.ref({
    phone: '',
    city: '',
  });

  return form;
}

const usePrice = () => {
  const priceArr = [10000, 8000, 5000];
  let index = 0;
  const price = Vue.ref(priceArr[index]);
  setInterval(() => {
    price.value = priceArr[index++ % priceArr.length];
  }, 1000);

  return price;
};
const app = Vue.createApp({
  setup() {
    const form = useForm();

    const submit = (num) => {
      if (!form.value.city) {
        Varlet.Dialog({ message: '请选择城市' });
        return;
      }
      if (!/^1\d{10}$/.test(form.value.phone)) {
        Varlet.Dialog({ message: '手机号不正确' }).then(() => {
          document.querySelector('.phone-inputer' + num).focus();
        });
        return;
      }
      axios.get('/url', { params: form.value }).then(() => {});
      location.href = '../success/success.html';
    };
    const cityShow = Vue.ref(false);
    function selectCity(city) {
      form.value.city = city;
      cityShow.value = false;
    }
    return {
      form,
      selectCity,
      submit,
      userJson,
      price: usePrice(),
      swiper,
      cityJson,
      hotcity,
      cityShow,
    };
  },
});

app.use(Varlet);
app.mount('#app');
