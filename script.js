$(document).ready(function () {
  showGreeting();
  loadTasks();

  $('#add-task').click(function () {
    const taskText = $('#new-task').val().trim();
    if (taskText !== '') {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addTask(taskText, false, time);
      $('#new-task').val('');
      saveTasks();
    }
  });

  $('#new-task').keypress(function (e) {
    if (e.which === 13) {
      $('#add-task').click();
    }
  });

  $('#task-list').on('click', '.complete-btn', function () {
    $(this).closest('li').toggleClass('completed');
    saveTasks();
  });

  $('#task-list').on('click', '.delete-btn', function () {
    $(this).closest('li').slideUp(300, function () {
      $(this).remove();
      saveTasks();
    });
  });

  function addTask(text, completed = false, time = null) {
    const taskTime = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const li = $(`
      <li class="${completed ? 'completed' : ''}">
        <div class="task-text">
          <span>${text}</span>
          <small>🕒 ${taskTime}</small>
        </div>
        <div class="task-actions">
          <i class="fas fa-check complete-btn"></i>
          <i class="fas fa-trash delete-btn"></i>
        </div>
      </li>
    `).hide().fadeIn(400);
    $('#task-list').append(li);
  }

  function saveTasks() {
    const tasks = [];
    $('#task-list li').each(function () {
      const text = $(this).find('span').text();
      const completed = $(this).hasClass('completed');
      const time = $(this).find('small').text().replace('🕒 ', '');
      tasks.push({ text, completed, time });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed, task.time));
  }

  function showGreeting() {
    const hour = new Date().getHours();
    let greeting = "Welcome";
    if (hour < 12) greeting = "Good Morning ☀️";
    else if (hour < 18) greeting = "Good Afternoon 🌤️";
    else greeting = "Good Evening 🌙";

    const greetingEl = $(`<div class="greeting">${greeting}!</div>`);
    $('body').prepend(greetingEl.hide().fadeIn(800));

    setTimeout(() => greetingEl.fadeOut(800, () => greetingEl.remove()), 3000);
  }
});
