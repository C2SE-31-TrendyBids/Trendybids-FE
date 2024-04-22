import {motion, useInView, useAnimation} from "framer-motion"
import React, {useEffect, useRef} from "react";

const Slide = ({children, maxWidth  = "1200px" , directionOfOperation = "right"}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true})

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{position: "relative", maxWidth, margin: "0 auto", overflowX:"hidden", overflowY:"hidden" }}>
            <motion.div
                variants={
                    {
                        hidden: {opacity: 0, x: directionOfOperation === "right" ? -300 : 300},
                        visible: {opacity: 1, x: 0},
                    }
                }
                initial="hidden"
                animate={mainControls}
                transition={{duration: 0.5, delay: 0.25}}
            >
                {
                    children
                }

            </motion.div>
        </div>
    )


}

export default Slide