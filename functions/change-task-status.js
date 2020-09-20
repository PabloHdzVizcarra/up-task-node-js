exports.changeTaskStatus = (task, state = 0) =>
  task.state === state ? (task.state = 1) : (task.state = state);
