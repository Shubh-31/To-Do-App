$(document).ready(function () {
    // Load tasks from localStorage
    loadTasks();
  
    // Add new task
    $('#add-task').click(function () {
      const taskText = $('#new-task').val().trim();
      if (taskText !== '') {
        addTask(taskText);
        $('#new-task').val('');
        saveTasks();
      }
    });
  
    // Pressing Enter adds task
    $('#new-task').keypress(function (e) {
      if (e.which === 13) {
        $('#add-task').click();
      }
    });
  
    // Mark task as complete
    $('#task-list').on('click', '.complete-btn', function () {
      $(this).closest('li').toggleClass('completed');
      saveTasks();
    });
  
    // Delete task
    $('#task-list').on('click', '.delete-btn', function () {
      $(this).closest('li').remove();
      saveTasks();
    });
  
    function addTask(text, completed = false) {
      const li = $(`
        <li class="${completed ? 'completed' : ''}">
          <span>${text}</span>
          <div class="task-actions">
            <i class="fas fa-check complete-btn"></i>
            <i class="fas fa-trash delete-btn"></i>
          </div>
        </li>
      `);
      $('#task-list').append(li);
    }
  
    function saveTasks() {
      const tasks = [];
      $('#task-list li').each(function () {
        const text = $(this).find('span').text();
        const completed = $(this).hasClass('completed');
        tasks.push({ text, completed });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => addTask(task.text, task.completed));
    }
  });
  