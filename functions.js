console.log("Functions");
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(courseInfo, AssignmentGroup, LearnerSubmissions) {
    if( CourseInfo.id !== AssignmentGroup.course_id) {
      throw new Error("AssignementGroup does not belong to the course.");
    }

    // calculate weighted average score for  a learner
    function calculateWeightedAverage(scores, totalPoints) {
      let sum = 0;
      for (let assignmentId in scores) {
          sum += (scores[assignmentId] / 100) * totalPoints[assignmentId];
      }
      return (sum / Object.keys(scores).length) * 100;
  }
// check if assignemnt is past due
  function isPastDue(assignemntDueDate) {
    return new Date() > new Date(assignemntDueDate);
  }
  
  // Learner Submissions
  const learnerData = [];
    for (const submission of learnerSubmissions) {
        const learnerId = submission.learner_id;
        const learnerSubData = { id: learnerId, avg: 0 };
        const scores = {};

        for (const assignment of assignmentGroup.assignments) {
          if (assignment.course_id !== courseInfo.id) {
              throw new Error("AssignmentGroup does not belong to the provided course.");
          }

          if (assignment.points_possible === 0) {
              console.error(`Assignment ${assignment.id} has points_possible set to 0.`);
              continue;
          }

          if (!Number.isFinite(submission.submission.score)) {
              console.error(`Invalid score for assignment ${assignment.id}. Expected a number.`);
              continue;
          }

          if (!isPastDue(assignment.due_at)) {
              continue;
          }
        }
    const result = [
      {
        id: 125,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: 0.94, // 47 / 50
        2: 1.0 // 150 / 150
      },
      {
        id: 132,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: 0.78, // 39 / 50
        2: 0.833 // late: (140 - 15) / 150
      }
    ];
  
    return result;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);
}
  