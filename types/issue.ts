export interface Issue {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface CreateIssue {
  title: string;
  description: string;
}
