import { useState } from 'react'
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AnimatePresence, motion } from 'framer-motion';
import { wrap } from "popmotion";


// TODO: Figure out how to get this to be a smooth transition
const variants = {
  // enter: (direction) => {
  //   return {
  //     x: direction > 0 ? 1000 : -1000,
  //     opacity: 0
  //   };
  // },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  // exit: (direction) => {
  //   return {
  //     zIndex: 0,
  //     x: direction < 0 ? 1000 : -1000,
  //     opacity: 0
  //   };
  // }
};

const slidersVariants = {
  hover: {
    scale: 1.2,
    color: "rgba(80, 170, 255, 0.8)",
  },
}; 

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Carousel = ({ slides }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, slides.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const slideOptions = {
    variants,
    custom: direction,
    key: page,
    initial: "enter",
    animate: "center",
    exit: "exit",
    transition: {
      x: { type: "spring", stiffness: 200, damping: 20 },
      opacity: { duration: 0.2 },
    },
    drag: "x",
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 1,
    onDragEnd: (e, { offset, velocity }) => {
      const swipe = swipePower(offset.x, velocity.x);

      if (swipe < -swipeConfidenceThreshold) {
        paginate(1);
      } else if (swipe > swipeConfidenceThreshold) {
        paginate(-1);
      }
    },
    sx: { minHeight: 400, my: 2 }
  };

  return (
    <Box sx={{  justifyContent: "center", mt: 2, width: "100vw" }}>
      <AnimatePresence initial={false} custom={direction}>
        {slides[imageIndex](slideOptions)}
      </AnimatePresence>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          onClick={() => paginate(-1)}
        >
          <FiberManualRecordIcon />
        </motion.div>
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          onClick={() => paginate(1)}
        >
          <FiberManualRecordIcon />
        </motion.div>
      </Box>
    </Box>
  )
}

export default Carousel