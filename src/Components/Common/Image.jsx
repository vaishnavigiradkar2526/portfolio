import React, { forwardRef } from "react"


const Image = forwardRef((props, ref) => {
  const { lazy, ...otherProps } = props

  return (
    <>
      <img className={props.className} ref={ref} loading={lazy ? "lazy" : undefined} {...otherProps} />
    </>
  )
})

export default Image
