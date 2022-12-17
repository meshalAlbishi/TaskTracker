import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  showAddTask: boolean = false;
  subscription: Subscription;

  text: string = "";
  day: string = "";
  reminder: boolean = false;

  @Output() onFormSubmit: EventEmitter<Task> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please Add a task");
      return;
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onFormSubmit.emit(newTask);

    this.text = '';
    this.reminder = false;
    this.day = '';

  }
}
