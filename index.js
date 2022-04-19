function calculateBmi(weight, height) {
    return weight / (height * height)
}

function calculateIdealWeight(height) {
    return 22.5 * height * height
}

function calculateBmr(weight, height, age, gender) {
    const heightInCm = height * 100

    let BMR = gender === 'f' ? 10 * weight + 6.25 * heightInCm - 5 * age - 150 :
            10 * weight + 6.25 * heightInCm - 5 * age + 50
    return BMR
}

function calculateDailyCalories(exercise, BMR) {
    let Calories = exercise === 'yes' ? BMR * 1.6 : BMR * 1.4
    return Calories
}

function calculateDietCalories(weightToLose, calories) {
    let amountOfCalories = weightToLose > 0 ? calories - 500 : calories + 500
    return amountOfCalories
}

function calculateDietTime(weight) {
    let dietTime = weight > 0 ? weight / 0.5 : Math.abs(weight / 0.5)
    return dietTime
}

function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
        console.log(`
        You gave ${argv.length - 2} arguments to the program

        Please provide 5 arguments for:
        weight (kg), 
        height (m), 
        age (years), 
        whether you exercise daily (yes or no)
        and your gender (m or f)

        Example:

        $ node index.js 82 1.79 32 yes m
        `)
        process.exit()
    }
}

function validateWeightHeightAndAge(argv1, argv2, argv3) {
    if (isNaN(argv1) || isNaN(argv2) || isNaN(argv3)) {
        console.log(`
        Please make sure weight, height and age are numbers:
    
        weight (kg) example: 82 | your input: ${argv1}
        height (m) example 1.79 | your input: ${argv2}
        age (years) example 32  | your input: ${argv3}
        `)
        process.exit()
    }
}

function validateAge(age) {
    if (age < 20) {
        console.log(`
        Sorry, This BMI calculator is designed for people over 20
        Your age input: ${age}`)
        process.exit()
    }
}

function validateWeight(weight) {
    if (weight > 300 || weight < 30) {
        console.log(`
        Please provide a number for weight in kilograms between 30 and 300
        Your input: ${weight}`)
        process.exit()
    }
}

function validateDailyExercise(exercise) {
    if (exercise !== 'yes' && exercise !== 'no') {
        console.log(`
        Please specify if you exercise daily with "yes" or "no"
        Your input ${exercise}`)
        process.exit()
    }
}

function validateGender(gender) {
    if (gender !== 'm' && gender !== 'f') {
        console.log(`
        Please provide 'm' for male or 'f' for female for gender
        Your input ${gender}
        `)
        process.exit()
    }
}

function formatOutput(userObject) {
    console.log(`
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.height} m
    weight: ${userObject.weight} kg
    do you exercise daily? ${userObject.activity}

    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.IdealWeight} kg
    With a normal lifestyle you burn ${userObject.DailyCalories} calories a day

    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.IdealWeight} kg:

    Eat ${userObject.DietCalories} calories a day
    For ${userObject.DietTime} weeks
    `)
}

function bmiCalculator() {

    validateNumberOfInputs(process.argv)
    validateWeightHeightAndAge(process.argv[2], process.argv[3], process.argv[4])
    validateAge(process.argv[4])
    validateWeight(process.argv[2])
    validateDailyExercise(process.argv[5])
    validateGender(process.argv[6])

    const weightInKg = parseInt(process.argv[2])
    const heightInM = parseFloat(process.argv[3])
    const age = parseInt(process.argv[4])
    const dailyExercise = process.argv[5]
    const gender = process.argv[6]

    const BMI = Math.round(calculateBmi(weightInKg, heightInM))
    const IdealWeight = Math.round(calculateIdealWeight(heightInM))
    const BMR = Math.round(calculateBmr(weightInKg, heightInM, age, gender))
    const DailyCalories = Math.round(calculateDailyCalories(dailyExercise, BMR))
    const weightToLose = weightInKg - IdealWeight
    const DietCalories = Math.round(calculateDietCalories(weightToLose, DailyCalories))
    const DietTime = Math.round(calculateDietTime(weightToLose))

    const user = {
        weight: weightInKg,
        height: heightInM,
        age: age,
        activity: dailyExercise,
        gender: gender,
        BMI: BMI,
        IdealWeight: IdealWeight,
        BMR: BMR,
        DailyCalories: DailyCalories,
        weightToLose: weightToLose,
        DietCalories: DietCalories,
        DietTime: DietTime,
    }
    console.log(formatOutput(user))
}

bmiCalculator()