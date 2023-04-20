import clsx from 'clsx'
import Project from '~/components/Project/Project'
import useLang from '~/langs/useLang'
import styles from './Projects.module.scss'

export default function Projects() {
  const { dict } = useLang()

  return (
    <div className={clsx(styles.projects, 'container')}>
      <div className={styles.list}>
        {dict.projects_list.map((project) => (
          <div key={project.link} className={styles.item}>
            <Project project={project}></Project>
          </div>
        ))}
      </div>
    </div>
  )
}
