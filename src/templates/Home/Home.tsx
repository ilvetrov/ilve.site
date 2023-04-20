import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BigButton from '~/components/BigButton/BigButton'
import EnableAudioButton from '~/components/EnableAudioButton/EnableAudioButton'
import LazySvg from '~/components/LazySvg/LazySvgComponent'
import BottomMenu from '~/components/Modal/BottomMenu/BottomMenu'
import Center from '~/components/Modal/Center/Center'
import { Contacts } from '~/components/Modal/Contacts/Contacts'
import ModalBase from '~/components/Modal/ModalBase'
import Title from '~/components/Title/Title'
import VideoTip from '~/components/VideoTip/VideoTip'
import WithBr from '~/components/WithBr/WithBr'
import useBackOrTo from '~/hooks/modal/useBackOrTo'
import useLang from '~/langs/useLang'
import styles from './Home.module.scss'

export default function Home() {
  const { dict } = useLang()

  const router = useRouter()

  const hasContacts = router.route === '/contacts'

  const goToHome = useBackOrTo(router, '/', hasContacts)

  const [videoIsRunning, setVideoIsRunning] = useState(false)

  useEffect(() => {
    setVideoIsRunning(false)
  }, [router.route])

  return (
    <div className={styles.homePage}>
      <div className="container">
        <h1 className={styles.homePage__title}>
          <Title>
            <WithBr>{dict.home_title}</WithBr>
          </Title>
        </h1>
        <div className={styles.homePage__videoWrap}>
          <div className={styles.homePage__video}>
            <VideoTip
              src={dict.home_video}
              sizes="(max-width: 359px) 67vw, (max-width: 1920px) 240px, 12.5vw"
              isActive={videoIsRunning}
              setIsActive={setVideoIsRunning}
            ></VideoTip>
            <LazySvg
              icon={() => import('./assets/arrow.svg')}
              className={styles.video__arrow}
              onClick={() => setVideoIsRunning(true)}
            ></LazySvg>
          </div>
          <div className={styles.homePage__videoButton}>
            <EnableAudioButton
              onClick={() => setVideoIsRunning(true)}
            ></EnableAudioButton>
          </div>
        </div>
        <div className={styles.homePage__buttons}>
          <div className={styles.buttons}>
            <div className={styles.buttons__button}>
              <Link href="/projects">
                <BigButton
                  title={dict.projects}
                  text={dict.projects_descr}
                ></BigButton>
              </Link>
            </div>
            <div className={styles.buttons__button}>
              <Link href="/contacts" scroll={false} shallow>
                <BigButton
                  title={dict.contacts}
                  text={dict.letsCooperate}
                ></BigButton>
              </Link>
            </div>
            <ModalBase isActive={hasContacts} close={goToHome}>
              {(modal) => (
                <Center isActive={modal.visible} close={modal.close}>
                  <BottomMenu title={dict.contacts}>
                    <Contacts list={dict.contacts_list}></Contacts>
                  </BottomMenu>
                </Center>
              )}
            </ModalBase>
          </div>
        </div>
      </div>
    </div>
  )
}
