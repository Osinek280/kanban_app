export type Priority = "low" | "medium" | "high"

export interface Task {
  _id: string;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  subtasks: string[];
}

export interface File {
  _id: string;
  name: string;
  ownerId: string;
  sections: string[];
  tasks: Task[];
}

export interface PrimaryColors {
  [key: string]: string;
}

export interface EditTaskProps {
  task: Task | undefined;
  sections: string[] | undefined;
  taskId: string;
  fileId: string;
}

export interface AddTaskProps {
  file: File | null;
  fileId: string
}

export interface AddSectionProps {
  fileId: string
}

export const primaryColors: PrimaryColors = {
  high: '#ff0000',
  medium: '#007bff',
  low: '#00aa00',
};

export const priorityLevels: Priority[] = ['low', 'medium', 'high']