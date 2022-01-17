<template>
  <section class="contacts-wrap">
    <PopUp class="contacts-pop-up" content-class="contacts-content full-width" isPage>
      <h2>{{ $t('contacts') }}</h2>
      <ul class="contacts">
        <li v-for="(contact, index) in db.getContacts()" :key="'contact-' + index" class="contact contacts__item">
          <div class="contact__header">
            <img-async :src="contact.icon" :alt="contact.title" class="contact__icon"/>
            <h3 class="contact__title">
              {{ contact.title }}
            </h3>
            <!-- /.contact__title -->
            <div class="contact__qr" v-if="contact.qr">
              <div
                class="contact-qr click-extender"
                @click="showPopUp('contact-qr-' + contact.qr)"
                :title="$t('open_on_phone')"
              >
                <div class="contact-qr__wrap">
                  <img-async
                    src="/img/qr-icon.svg"
                    :alt="$t('qr_code')"
                    class="contact-qr__img"
                  />
                  <div v-if="count('contact-qr') === 0" class="contact-qr__help">
                    <div class="contact-qr-help">
                      <div class="contact-qr-help__arrow-wrap">
                        <img-async src="/img/qr-arrow.svg" alt class="contact-qr-help__arrow"/>
                      </div>
                      <!-- /.contact-qr-help__arrow-wrap -->
                      <div class="contact-qr-help__title" v-html="$t('open_on_phone_h')"></div>
                      <!-- /.contact-qr-help__title -->
                    </div>
                    <!-- /.contact-qr-help -->
                  </div>
                  <!-- /.contact-qr__help -->
                </div>
                <!-- /.contact__qr-wrap -->
              </div>
              <!-- /.contact-qr -->
            </div>
            <!-- /.contact__qr -->
          </div>
          <!-- /.contact__header -->
          <div class="contact__link-wrap">
            <a :href="contact.link" target="_blank" class="contact__link not-link-style" @click="reachGoal('contact_click', {
              ab: ['db_hello_video']
            })">
              {{ contact.link_text }}
            </a>
            <!-- /.contact__link -->
          </div>
          <!-- /.contact__link-wrap -->
          <div v-if="false" class="contact__qr-block">
            <div class="contact__qr-title">
              {{ $t('or_scan') }}
            </div>
            <!-- /.contact__qr-title -->
          </div>
          <!-- /.contact__qr-block -->
        </li>
        <!-- /.contact -->
      </ul>
      <!-- /.contacts -->
    </PopUp>
    <QrPopUp
      v-for="contact in db.getContacts().filter(contact => !!contact.qr)"
      :key="'contact-qr-' + contact.qr"
      :data="{
        qr: contact.qr,
        title: contact.title,
        name: 'contact-qr-' + contact.qr
      }"
    />
  </section>
  <!-- /.contacts-wrap -->
</template>

<script>
import { DB } from '~/db'
import { showPopUp } from '~/plugins/pop-up'
import { blockScroll, unblockScroll } from '~/plugins/block-scroll'
import getHead from '~/plugins/get-head'
import { metrics } from '~/plugins/metrics'
export default {
  transition: {
    name: 'pop-up'
  },
  head() {
    return getHead(this, {
      title: this.$t('ilia_vetrov') + '. ' + this.$t('contacts') + '. ' + this.$t('web_development')
    })
  },
  data() {
    return {
      counters: {},
      db: new DB(this)
    }
  },
  methods: {
    count(name) {
      if (!this.$data.counters.hasOwnProperty(name)) this.$data.counters[name] = -1
      return ++this.$data.counters[name]
    },
    showPopUp,
    reachGoal: (...attrs) => metrics.reachGoal(...attrs)
  },
  mounted() {
    if (process.browser) {
      blockScroll('as-page')
    }
  },
  beforeDestroy() {
    unblockScroll('as-page')
  }
}
</script>

<style lang="scss">
  .contacts-content {
    max-width: 34rem;
  }
  .contacts {
    margin-top: 2rem;
    margin-bottom: 2.8125rem;

    &__item {
      margin-bottom: 2rem;
    }
  }
  .contact {
    &__header {
      margin-bottom: .3125rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__icon {
      height: 1rem;
      width: auto;
      margin-right: .375rem;
    }
    &__title {
      line-height: 1;
      font-weight: 400;
      text-align: center;
    }
    &__link-wrap {
      text-align: center;
    }
    &__link {
      font-weight: 400;
      color: #C4BFFF;
      font-size: .875rem;
      line-height: 1;
      transition: color .15s;

      &:hover, &:focus {
        color: #d9d6fd;
      }
    }
    &__qr {
      margin-left: .6875rem;
    }
    &__qr-title {
      font-size: .875rem;
      line-height: 1;
      font-weight: 400;
      text-align: center;
      margin-bottom: 1rem;
    }
  }
  .contact-qr {
    cursor: pointer;

    &__wrap {
      position: relative;
    }

    &__img {
      width: 1rem;
      height: 1rem;
      opacity: .4;
      transition: opacity .2s;
    }

    &__help {
      position: absolute;
      transform: translateX(100%);
      top: 0;
      right: -.6875rem;

      @media (max-width: 539px) {
        display: none;
      }
    }

    &:hover &, &:focus & {
      &__img {
        opacity: 1;
      }
    }
  }
  .contact-qr-help {
    position: relative;
    display: flex;
    align-items: center;
    transform-origin: left;
    transition: transform .15s;

    &__arrow-wrap {
      position: relative;
      width: 2.25rem;
      height: .75rem;
      margin-bottom: .0625rem;
      margin-right: .25rem;
    }
    &__arrow {
      display: block;
      width: 100%;
      height: 100%;
    }
    &__title {
      font-size: .75rem;
      line-height: 1.05;
      font-weight: 400;
      text-align: center;
    }

    &:hover, &:focus {
      transform: scale(1.05);
    }
  }
</style>