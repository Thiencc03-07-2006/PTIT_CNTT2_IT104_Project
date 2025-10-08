// Type cho user
export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};
// Type cho task
export type Task = {
  id: string;
  taskName: string;
  assigneeId: string;
  projectId: string;
  asignDate: string; // Định dạng "YYYY-MM-DD"
  dueDate: string; // Định dạng "YYYY-MM-DD"
  priority: "Thấp" | "Trung bình" | "Cao"; // Nếu có thêm mức khác thì thêm vào
  progress: string; // Có thể dùng enum nếu có danh sách tiến độ cố định
  status: "To do" | "In progress" | "Done"; // Tùy theo các trạng thái
};

// Type cho thành viên trong project
export type ProjectMember = {
  userId: string;
  role: string; // "Project owner", "Frontend developer", ...
};

// Type cho project
export type Project = {
  id: string;
  projectName: string;
  image: string;
  members: ProjectMember[];
};
