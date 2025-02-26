const apiUrl = 'http://localhost:5000/api'; // Change this URL if necessary
let currentToken = '';

// Show the login and register forms
function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
}

// Show the user section after login
function showUserSection() {
  document.getElementById('authSection').style.display = 'none';
  document.getElementById('userSection').style.display = 'block';
}


async function loginUser() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
    currentToken = data.token;
    localStorage.setItem('token', currentToken); // Сохранение токена
    showUserSection();
    showRecordHistory(); // Показываем записи
  } else {
    alert(data.message);
  }
}



// Register the user
async function registerUser() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  const response = await fetch(`${apiUrl}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  if (response.ok) {
    alert('User registered successfully!');
    showLoginForm();
  } else {
    alert(data.message);
  }
}

// Show the form to add a budget
function showBudgetForm() {
  document.getElementById('budgetForm').style.display = 'block';
  document.getElementById('budgetList').style.display = 'none';
}

// Show the budget list
function showBudgetList() {
  document.getElementById('budgetForm').style.display = 'none';
  document.getElementById('budgetList').style.display = 'block';
  fetchBudgets();
}

// Fetch all budgets and display them
async function fetchBudgets() {
  const response = await fetch(`${apiUrl}/budgets`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
    }
  });

  const data = await response.json();
  const budgetItems = document.getElementById('budgetItems');
  budgetItems.innerHTML = '';

  data.forEach(budget => {
    const li = document.createElement('li');
    li.innerHTML = `${budget.category}: $${budget.limit} 
      <button onclick="deleteBudget('${budget._id}')">Delete</button> 
      <button onclick="editBudget('${budget._id}')">Edit</button>`;
    budgetItems.appendChild(li);
  });
}

// Add a new budget
async function addBudget() {
  const category = document.getElementById('budgetCategory').value;
  const limit = document.getElementById('budgetLimit').value;

  const response = await fetch(`${apiUrl}/budgets`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, limit })
  });

  const data = await response.json();
  if (response.ok) {
    showBudgetList();
  } else {
    alert(data.message);
  }
}

// Delete a budget
async function deleteBudget(budgetId) {
  const response = await fetch(`${apiUrl}/budgets/${budgetId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
    }
  });

  const data = await response.json();
  if (response.ok) {
    fetchBudgets(); // Refresh the list of budgets
  } else {
    alert(data.message);
  }
}

// Show the form to add a record
function showRecordForm() {
  document.getElementById('recordForm').style.display = 'block';
  document.getElementById('recordHistory').style.display = 'none';
}

// Add a new record (expense or income)
async function addRecord() {
  const category = document.getElementById('recordCategory').value;
  const amount = document.getElementById('recordAmount').value;
  const type = document.getElementById('recordType').value;

  const response = await fetch(`${apiUrl}/records`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ category, amount, type })
  });

  const data = await response.json();
  if (response.ok) {
    showRecordHistory();
  } else {
    alert(data.message);
  }
}



async function deleteRecord(recordId) {
  const response = await fetch(`${apiUrl}/records/${recordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
    }
  });

  const data = await response.json();
  if (response.ok) {
    showRecordHistory(); // Обновление списка записей
  } else {
    alert(data.message);
  }
}

async function showRecordHistory() {
  const response = await fetch(`${apiUrl}/records`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${currentToken}`,
    }
  });

  const data = await response.json();
  const recordItems = document.getElementById('recordItems');
  recordItems.innerHTML = '';

  data.forEach(record => {
    const li = document.createElement('li');
    li.innerHTML = `${record.category}: $${record.amount} (${record.type}) 
      <button onclick="deleteRecord('${record._id}')">Delete</button>`;
    recordItems.appendChild(li);
  });

  document.getElementById('recordForm').style.display = 'none';
  document.getElementById('recordHistory').style.display = 'block';
}

// Проверка, есть ли сохраненный токен
window.onload = function () {
  currentToken = localStorage.getItem('token');
  if (currentToken) {
    showUserSection();
    showRecordHistory(); // Если токен есть, показываем записи
  }
};

// Функция выхода
function logoutUser() {
  localStorage.removeItem('token'); // Удаляем токен
  currentToken = '';
  document.getElementById('authSection').style.display = 'block';
  document.getElementById('userSection').style.display = 'none';
}

