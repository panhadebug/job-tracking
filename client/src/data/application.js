const applications = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Applied",
    date: "2022-01-01",
    jobLink: "https://www.google.com",
    notes: "Frontend Developer",
  },
  {
    id: 2,
    company: "Amazon",
    position: "SDE Intern",
    status: "Interview",
    date: "2022-01-01",
    jobLink: "https://www.amazon.com",
    notes: "Frontend Developer",
  },
];

for (let app in applications) {
  <tr key={GET /applications}>
    <td>{applications[app].company}</td>
    <td>{applications[app].position}</td>
    <td>{applications[app].status}</td>
    <td>{applications[app].date}</td>
    <td>{applications[app].jobLink}</td>
    <td>{applications[app].notes}</td>
  </tr>
}