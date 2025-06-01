import {
    FitnessCenterRounded,
    LocalFireDepartmentRounded,
    TimelineRounded,
} from "@mui/icons-material";

// FitnessCenterRounded: a gym/fitness-related icon.

// LocalFireDepartmentRounded: a fire/flame icon (used here to represent calories burned).

// TimelineRounded: a timeline or graph icon (used here for average calories per workout).

export const counts = [
    {
        name:"Calories Burned",
        icon:(
            <LocalFireDepartmentRounded sx = {{ fontSize: "26px", color: "inherit" }} />
        ),

//         sx is a quick way to style MUI components.

// color: "inherit" makes the icon use the parent element’s color.

// fontSize: "26px" sets the icon size to 26 pixels.

        desc:"Toatal calories burned today",
        key:"totalCaloriesBurned",
        color:"#eb9e34",
        unit:"kcal",
        lightColor:"#fdf4ea",
    },
    {
        name:"Workouts",
        icon:(
            <FitnessCenterRounded sx = {{ fontSize: "26px", color: "inherit" }} />
        ),
        desc:"Total no of workout today",
        key:"totalWorkouts",
        color:"#41c1a6",
        unit:"",
        lightColor:"#e8f6f3",
    },
    {
        name:"Avg Calories burned ",
        icon:(
            <TimelineRounded sx = {{ fontSize: "26px", color: "inherit" }} />
        ),
        desc:"Average calories burned per workout today",
        key:"avgCaloriesPerWorkout",
        unit: "kcal",
        color: "#FF9AD5",
        lightColor: "#FEF3F9",
    }
]