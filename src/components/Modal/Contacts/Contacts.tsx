/* eslint-disable react/no-array-index-key */
import State from '~/components/State/State'
import Center from '../Center/Center'
import ModalBase from '../ModalBase'
import styles from './Contacts.module.scss'

export interface IContact {
  iconHref: string
  name: string
  linkText: string
  href: string
  qrHref: string
}

export function Contacts(props: { list: IContact[] }) {
  return (
    <div className={styles.contacts}>
      {props.list.map((contact, index) => (
        <div key={index} className={styles.contacts__item}>
          <div className={styles.contact}>
            <a
              href={contact.href}
              className={styles.contact__header}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={contact.iconHref}
                alt="Icon"
                loading="lazy"
                decoding="async"
                className={styles.contact__icon}
                width="18"
                height="18"
              />
              <div className={styles.contact__name}>{contact.name}</div>
            </a>
            <a
              href={contact.href}
              className={styles.contact__link}
              target="_blank"
              rel="noreferrer"
            >
              {contact.linkText}
            </a>
            <div className={styles.contact__qr}>
              <State value={false}>
                {(isActive, setIsActive) => (
                  <>
                    <ModalBase
                      isActive={isActive}
                      close={() => setIsActive(false)}
                      backgroundOpacity={0.8}
                      inRoot
                    >
                      {(modal) => (
                        <Center isActive={modal.visible} close={modal.close}>
                          <div className={styles.qrInModal}>
                            <div className={styles.qrInModal__title}>
                              {contact.name}
                            </div>
                            <img
                              src={contact.qrHref}
                              alt="QR Code"
                              loading="lazy"
                              decoding="async"
                              width="200"
                              height="200"
                              className={styles.qrInModal__icon}
                            />
                          </div>
                        </Center>
                      )}
                    </ModalBase>
                    <button
                      className={styles.qr}
                      type="button"
                      onClick={() => setIsActive(true)}
                    >
                      <img
                        src="/img/qr/common-icon.svg"
                        alt="Open QR Code"
                        className={styles.qr__image}
                        loading="lazy"
                        decoding="async"
                        width="16"
                        height="16"
                      />
                    </button>
                  </>
                )}
              </State>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
