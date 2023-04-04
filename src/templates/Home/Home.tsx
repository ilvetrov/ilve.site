import ExpandableVideo from '~/components/ExpandableVideo/ExpandableVideo'
import Header from '~/components/Header/Header'
import Title from '~/components/Title/Title'
import WithBr from '~/components/WithBr/WithBr'
import useLang from '~/langs/useLang'
import styles from './Home.module.scss'

export default function Home() {
  const { dict } = useLang()

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__header}>
        <Header></Header>
      </div>
      <h1 className={styles.homePage__title}>
        <Title>
          <WithBr>{dict.home_title}</WithBr>
        </Title>
      </h1>
      <div className={styles.homePage__video}>
        <ExpandableVideo src={dict.home_video}></ExpandableVideo>
      </div>
    </div>
  )
}
