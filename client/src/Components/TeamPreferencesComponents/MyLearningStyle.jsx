import { Link, Typography, Slider, Box } from "@mui/material";

export default function MyLearningStyle(props) {
    
    function LearningStyleSlider(leftLabel, rightLabel, value, setter) {

        function handleChangeSliderValue(event) {

            setter(event.target.value);            
        }

        const marks = [
            { value: -11, label: leftLabel },
            { value: 11, label: rightLabel },
        ];
    
        return (
            <Box sx={{mx: 4, my: 2}}>
                <Slider
                    defaultValue={1}
                    step={2}
                    marks={marks}
                    min={-11}
                    max={11}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(v) => Math.abs(v)}
                    track={false}
                    value={value}
                    onChange={handleChangeSliderValue}
                >
                </Slider>
            </Box>
    
        );
    }

    return (
        <>
            <Typography variant="h5" sx={{ mb: 1 }}>
                My Learning Style
            </Typography>

            <Typography sx={{ mb: 5 }}>
                Please visit <Link href="https://www.webtools.ncsu.edu/learningstyles/">this website</Link> to find out your studying personality through a quick five-minute questionnaire.
            </Typography>

            <Typography variant="h6">
                Enter your results
            </Typography>

            {LearningStyleSlider("Active", "Reflective", props.userLearningStyleDimension0, props.setUserLearningStyleDimension0)}

            {LearningStyleSlider("Sensing", "Intuitive", props.userLearningStyleDimension1, props.setUserLearningStyleDimension1)}

            {LearningStyleSlider("Visual", "Verbal", props.userLearningStyleDimension2, props.setUserLearningStyleDimension2)}

            {LearningStyleSlider("Sequential", "Global", props.userLearningStyleDimension3, props.setUserLearningStyleDimension3)}
        </>
    );
}
