import {motion, useInView, useAnimation} from "framer-motion"
import React, {useEffect, useRef} from "react";

const Reveal = ({children, maxWidth = "1230px"}) => {
    const ref = useRef(null)
    const isInView = useInView(ref, {once: true})

    const mainControls = useAnimation()
    const slideControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible")
            slideControls.start("visible")
        }
    }, [isInView])

    return (
        <div ref={ref} style={{position: "relative", maxWidth, margin: "0 auto" , padding: maxWidth === "100%" ? "0" : "0 30px", overflowX:"hidden" }}>
            <motion.div
                variants={
                    {
                        hidden: {opacity: 0, y: 75},
                        visible: {opacity: 1, y: 0},
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
            <motion.div
                variants={
                    {
                        hidden: {left: 0},
                        visible: {left: "100%"},
                    }
                }
                initial="hidden"
                animate={slideControls}
                transition={{duration: 0.5, ease: "easeIn"}}
                style={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    backgroundColor: "#F4F5FC",
                    opacity:0.8,
                    zIndex: 20
                }}
            >

            </motion.div>
        </div>

    )

}

export default Reveal