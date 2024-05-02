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
  

  function getLearnerData(course, ag, submissions) {
    const result = [];
  
    if (course.id !== ag.course_id) {
      throw new Error('Invalid Data: Course ID does not mathc assignment group');
    }
  
    const assignmentObj = {};
  
    for (let i = 0; i < ag.assignments.length; i++) {
      assignmentObj[ag.assignments[i].id] = ag.assignments[i];
    }
  
    const studentTracker = {};
  
    for (let sub of submissions) {
      const assignment = assignmentObj[sub.assignment_id];
      const notDue = isNotDue(assignment);
  
      if (notDue === true) {
        continue; // skips iteration in forEach
      }
  
      if (
        assignment.points_possible <= 0 ||
        typeof assignment.points_possible !== 'number' ||
        typeof sub.submission.score !== 'number'
      ) {
        throw new Error('Invalid Data');
      }
  
      const isLate = sub.submission.submitted_at > assignment.due_at;
      const lateDeduction = assignment.points_possible * 0.1;
      const score = isLate
        ? sub.submission.score - lateDeduction
        : sub.submission.score;
  
      if (studentTracker[sub.learner_id]) {
        studentTracker[sub.learner_id].totalScore += score;
        studentTracker[sub.learner_id].totalPossible +=
          assignment.points_possible;
      } else {
        // We make a new object because it's the first time we see this learner
        studentTracker[sub.learner_id] = {
          id: sub.learner_id,
          totalScore: score,
          totalPossible: assignment.points_possible,
        };
        result.push(studentTracker[sub.learner_id]);
      }
  
      studentTracker[sub.learner_id].avg = Number(
        (
          studentTracker[sub.learner_id].totalScore /
          studentTracker[sub.learner_id].totalPossible
        ).toFixed(2)
      );
  
      studentTracker[sub.learner_id][assignment.id] = Number(
        (score / assignment.points_possible).toFixed(2)
      );
    }
  
    for (let i = 0; i < result.length; i++) {
      delete result[i].totalPossible;
      delete result[i].totalScore;
    }
  
    return result;
  }
  
  function isNotDue(assignment) {
    return new Date(assignment.due_at).getTime() > new Date().getTime();
  } // returns a Boolean
  console.log(getLearnerData())
//   // Loop through learner submissions using for loop and if
//   for (const submission of submissions) {
//     const learnerID = submission.learner_id;
//     const assignmentID = submission.assignment_id;
//     const assignment = assignmentGroup.assignments.find(assignment => assignment.id === assignmentID);

//     if (!assignment) {
//       console.log(`Error with learner ID ${learnerID} has an invalid assignment ID ${assignmentID}. Skipping.`);
//       continue; // Skip this submission and move to the next one
//     }

//     const dueDate = new Date(assignment.due_at);
//     const submittedDate = new Date(submission.submission.submitted_at);

//     // Check if assignment is not yet due
//     if (submittedDate < dueDate) {
//       console.log(`Assignment ${assignment.name} for learner ID ${learnerID} is not yet due.`);
//       continue; // Skip this assignment and move to the next one because it is continue
//     }

//     // Calculate late penalty which is 10%
//     const daysLate = Math.ceil((submittedDate - dueDate) / (1000 * 60 * 60 * 24));
//     const latePenalty = daysLate > 0 ? 0.1 * assignment.points_possible : 0;

//     let score = submission.submission.score;

//     // Apply late penalty
//     score -= latePenalty;

//     // Ensure score is not negative
//     if (score < 0) {
//       score = 0;
//   }

//     // Calculate percentage
//     const percentage = score / assignment.points_possible;

//     // Find existing learner data or create new
//     const existingDataIndex = result.findIndex(item => item.id === learnerID);

//     if (existingDataIndex !== -1) {
//       result[existingDataIndex][assignmentID] = percentage;
//       result[existingDataIndex].avg += percentage;
//     } else {
//       const newData = {
//         id: learnerID,
//         avg: percentage,
//         [assignmentID]: percentage
//       };
//       result.push(newData);
//     }

//   }

//   // Calculate average for each learner
// for (let data of result) {
//     data.avg /= Object.keys(data).length - 1; // Exclude 'id' property
//   }       

//   return result;
// }

// // Execute the function and catch any errors
// try {
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//   console.log(result);
// } catch (error) {
//   console.error(error.message);


// function isNotDue (assignment) {
//   return new Date(assignment.due_at).getTime() > new Date().getTime();
// }
