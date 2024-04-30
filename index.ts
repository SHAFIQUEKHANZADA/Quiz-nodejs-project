#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


let url = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";

let first = async(getData: string) => {
    let a = await fetch(getData)
    let b = await a.json()
    return b.results
}

let getData = await first(url)

let start = async() => {
    console.log(chalk.bold.bgGreenBright("Geography quiz"))
    let score = 0
    let userName = await inquirer.prompt({
        name: "users",
        type: "input",
        message: "Enter your name: "
    })
    for(let i = 1; i < 10; i++) {
        let answer = [...getData[i].incorrect_answers, getData[i].correct_answer] 
        let ans = await inquirer.prompt({
            type: "list",
            name: "an",
            message: getData[i].question,
            choices: answer.map((x: any) => x)
        })
        if(ans.an == getData[i].correct_answer) {
            score++
            console.log(chalk.bold.blueBright("Correct"))
        } else { 
            console.log(`Correct answer is ${chalk.italic.redBright(getData[i].correct_answer)}`)
        }
    }
    if (score > 5) {
        console.log(chalk.bold.green(`${userName.users}, you passed with a score of ${score} out of 10!`));
    } else {
        console.log(chalk.bold.red(`${userName.users}, you failed with a score of ${score} out of 10.`));
    }
}
start()