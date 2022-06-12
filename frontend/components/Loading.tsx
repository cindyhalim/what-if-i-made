import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { Flex } from "rebass"

export const Loading = () => {
  return (
    <Flex sx={{ justifyContent: "space-evenly", width: "100%" }}>
      <motion.div
        animate={{ scale: [1.5, 2, 2, 1.5, 1.5] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        💸
      </motion.div>
      <motion.div
        animate={{ scale: [1.5, 2, 2, 1.5, 1.5] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 0.4,
        }}
      >
        💸
      </motion.div>
      <motion.div
        animate={{ scale: [1.5, 2, 2, 1.5, 1.5] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 1,
          delay: 0.8,
        }}
      >
        💸
      </motion.div>
    </Flex>
  )
}
