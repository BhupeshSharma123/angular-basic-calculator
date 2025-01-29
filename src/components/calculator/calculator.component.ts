import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CalculatorComponent implements OnInit {
  question: string = '0';
  result: string = '0';
  operator: string | null = null;
  log: string[] = [];
  constructor() {}
  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  operators = ['+', '-', '*', '/'];

  ngOnInit() {}

  // Append a number or decimal to the question
  appendNumber(num: string): void {
    if (this.question === '0' || this.question === 'Error') {
      this.question = num;
    } else {
      this.question += num;
    }
  }
  logCalculation(entry: string): void {
    this.log.unshift(entry); // Add to log (newest first)
    if (this.log.length > 10) {
      this.log.pop(); // Keep only the last 10 entries
    }
  }
  // Set the operator and handle automatic calculation
  setOperator(operator: string): void {
    if (this.question === '0' || this.question === 'Error') {
      return; // Prevent setting an operator if no number is entered
    }
    const lastChar = this.question.slice(-1);
    console.log(lastChar);

    // Check if the last character is an operator
    if (['+', '-', '*', '/'].includes(lastChar)) {
      this.question = this.question.slice(0, -1) + operator; // Replace last operator
    } else {
      this.question += operator;
    }

    this.operator = operator;
  }

  // Calculate the result of the expression using eval
  calculate(): void {
    try {
      this.result = eval(this.question).toString();
      this.question = this.result; // Update question with the result
      this.operator = null;
    } catch (error) {
      this.handleError();
    }
  }

  // Clear the calculator state
  clear(): void {
    this.question = '0';
    this.result = '0';
    this.operator = null;
  }

  // Remove the last character from the question
  backspace(): void {
    if (this.question !== 'Error') {
      this.question = this.question.slice(0, -1) || '0'; // Reset to '0' if empty
    }
  }

  // Handle errors during calculation
  private handleError(): void {
    this.result = 'Error';
    this.question = 'Error';
    this.operator = null;
  }
}
