/* eslint-disable react/no-array-index-key */
import { Fragment, memo } from 'react'

function WithBr(props: { children: string }) {
  const stringParts = props.children.split('<br>')

  return (
    <>
      {stringParts.map((stringPart, key) => (
        <Fragment key={key}>
          {stringPart}
          {key < stringParts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  )
}

export default memo(WithBr)
