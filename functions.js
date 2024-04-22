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
    const result = [];
    let learnerData = {};
    if( CourseInfo.id !== AssignmentGroup.course_id) {
      throw new Error("AssignementGroup does not belong to the course.");
    }
    // process learner submissions
    for(let submission of LearnerSubmissions ) {
      let learnerId = submission.learner_id;
      let learnerSubData = {id: learnerId, avg: 0} // this object holds data for specific learner
      let scores = [] //array for all scores of learner

      for (let assignment of AssignmentGroup.assignments) {
        if(assignment.course_id !== courseInfo.id){
          throw new Error("The assignmentGroup does not belong to the provided course");
        }
        if(assignment.points_possible === 0){
          console.error(`Assignment ${assignment.id} has 0point.`);
          continue;
        }
        // Validate data process to ensure that the score provided by learner are valid number preventing errors

        if(!Number.isFinite(submission.submission.score)){
          console.error(`Invalid score for assignment ${assignment.id}.`);
          continue;
        }

        // Check if the assignment is still due or not
        if(!isPastDue(assignment.due_at)) {
          continue;
        }

        //Using try and catch for penalty
        let latePenalty = 0;
        try {
          if (submission.submission.submitted_at > assignment.due_at){
            latePenalty = 0.1 // 10% of penalty
          }
        }catch (error){
          console.error(`Error  while processing submission date for assignment ${assignment.id}:`, error.message);
        }
        let score = (submission.submission.score / assignment.points_possible) * (1 - latePenalty) * 100;
        score = scores[assignment.id];
      }

      // Helper function to calculate weighted average score for a learner
    function calculateWeightedAverage(scores, totalPoints) {
      let sum = 0;
      for (const assignmentId in scores) {
          sum += (scores[assignmentId] / 100) * totalPoints[assignmentId];
      }
      return (sum / Object.keys(scores).length) * 100;
  }
   
    return result;
  }
}

  result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result)
