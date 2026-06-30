const applications = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
  },
  {
    id: 2,
    company: "Amazon",
    position: "SDE Intern",
    status: "Interview",
  },
];
applications.map((app) => (
  <tr key={app.id}>
    <td>{app.company}</td>
    <td>{app.position}</td>
    <td>{app.status}</td>
  </tr>
));