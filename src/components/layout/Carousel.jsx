import { useState } from 'react'
import { Box, Grid } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { AnimatePresence, motion } from 'framer-motion';


const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('left');

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === slides.length ? 0 : prevIndex + 1
    );
  };
  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Constants
  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 0.75,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: direction === "right" ? "100%" : "-100%",
      // x: "100%",
      transition: {
        duration: 0.5,
      },
    },
  };

  const slidersVariants = {
    hover: {
      scale: 1.2,
      color: "rgba(80, 170, 255, 0.8)",
    },
  }; 

  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: 0,
      scale: 1.3,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Box>
      <AnimatePresence>
        <Grid 
          component={motion.div}
          key={currentIndex}
          variants={slideVariants}
          initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
          animate="visible"
          exit="exit"
          sx={{ margin: "16px", gap: 2 }}
        >
          {slides[currentIndex]}
        </Grid>
      </AnimatePresence>
      <Box className="slide_direction" sx={{ display: "flex", justifyContent: "center" }}>
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="left"
          onClick={handlePrevious}
        >
          <FiberManualRecordIcon />
        </motion.div>
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="right"
          onClick={handleNext}
        >
          <FiberManualRecordIcon />
        </motion.div>
      </Box>
      <Box className="indicator">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            // className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          >
          {/* {!currentIndex ? "Steps" : "Weight"} */}
            {/* {currentIndex === index ? <FiberManualRecordIcon /> : null} */}
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}

export default Carousel