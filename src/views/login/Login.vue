// eslint-disable-next-line import/no-duplicates
<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" class="wrapper__input__content" placeholder="请输入用户名" v-model="username" />
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content" placeholder="请输入密码" autocomplete="new-password" v-model="password" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <!-- <ToAst v-show="data.showToast" :message="data.toastMessage" /> -->
    <!-- <ToAst message="哈哈" /> -->
    <ToAst v-show="show" :message="toastMessage" />

  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import ToAst, { useToastEffect } from '../../components/ToAst'
// import ToAst from '../../components/ToAst'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: { ToAst },
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const router = useRouter()
    const data = reactive({ username: '', password: '' })
    const { showToast, show, toastMessage } = useToastEffect()
    const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })

        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
    const handleRegisterClick = () => {
      router.push({ name: 'Register' })
    }
    const { username, password } = toRefs(data)
    return {
      handleLogin,
      handleRegisterClick,
      show,
      toastMessage,
      username,
      password
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, .1);
    border-radius: .06rem;

    &__content {
      margin-top: .12rem;
      line-height: .22rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__login-button {
    height: .48rem;
    margin: .23rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, .32);
    border-radius: .04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }

  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
  }
}
</style>
